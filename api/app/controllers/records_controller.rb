require "csv"

class RecordsController < ApplicationController
  before_action :set_record, only: %i[ show update destroy ]

  # GET /records
  def index
    @records = Record.search(params)

    render json: @records
  end

  # GET /records/:id
  def show
    render json: @record.as_json(include: { genres: { only: :name } })
  end

  # POST /records
  def create
    # Extract genre IDs from the request parameters.
    genre_ids = params[:genre_ids] || []

    # If param exists, ensure that genre_ids is an array before proceeding.
    unless genre_ids.is_a?(Array)
      render json: { error: "genre_ids must be an array of IDs" },
            status: :unprocessable_content
      return
    end

    ActiveRecord::Base.transaction do
      # Find the existing genres selected in the React multiselect.
      genres = Genre.where(id: genre_ids.uniq)

      # Reject the request if any submitted genre ID doesn't exist.
      if genres.size != genre_ids.uniq.size
        render json: { error: "One or more genre IDs are invalid" },
              status: :unprocessable_content
        raise ActiveRecord::Rollback
      end

      # Create the record using only its own database attributes.
      @record = Record.create!(record_params)

      # Create the associations through the join table.
      @record.genres = genres
    end

    # Don't render a successful response if the transaction rolled back.
    return if performed?

    render json: @record.as_json(
      include: { genres: { only: [:id, :name] } }
    ), status: :created, location: record_url(@record)

  rescue ActiveRecord::RecordInvalid => e
    render json: {
      errors: e.record.errors.full_messages.presence || [e.message]
    }, status: :unprocessable_content
  end

  # POST /records/bulk_create (takes a CSV file)
  def bulk_create
    file = params.require(:file)
    
    # Check if file is a CSV
    unless File.extname(file.original_filename).casecmp?(".csv")
      render json: { error: "Invalid file format" }, status: :unprocessable_content
      return
    end

    # Read the CSV file and parse its contents
    csv_text = file.read.force_encoding("UTF-8")

    unless csv_text.valid_encoding?
      render json: { error: "CSV must use valid UTF-8 encoding" },
            status: :unprocessable_content
      return
    end
    
    # Remove a UTF-8 BOM if the exported CSV includes one
    csv_text = csv_text.delete_prefix("\uFEFF")

    csv = CSV.parse(csv_text, headers: true)
    Record.transaction do
      # Take genre out of the row hash before creating the record, since genres are handled separately.
      csv.each do |row|
        row_hash = row.to_h
        genres = row_hash.delete("genres").split("|") # genres are a string separated by "|"
        record = Record.create!(row_hash)
        
        # Handle the genre separately, e.g., by creating associations with the Genre model.
        genres.each do |genre|
          next if genre.blank?
          canonical_genre = GenreCanonicalizer.canonicalize(genre)
          genre_record = Genre.find_or_create_by!(name: canonical_genre)
          RecordGenre.find_or_create_by!(record: record, genre: genre_record)
        end
      end
    end

    render json: {"success" => true}, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_content
  end

  # PATCH/PUT /records/:id
  def update
    if @record.update(record_params)
      render json: @record
    else
      render json: @record.errors, status: :unprocessable_content
    end
  end

  # DELETE /records/:id
  def destroy
    @record.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_record
      @record = Record.find(params.require(:id))
    end

    # Only allow a list of trusted parameters through.
    def record_params
      params.require(:record).permit(:title, :artist_name, :release_year)
    end

end
