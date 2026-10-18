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
    render json: @record
  end

  # POST /records
  def create
    @record = Record.new(record_params)

    if @record.save
      render json: @record, status: :created, location: @record
    else
      render json: @record.errors, status: :unprocessable_content
    end
  end

  # POST /records/bulk_create (takes a CSV file)
  def bulk_create
    file = params.require(:file)
    # Check if file is a CSV
    unless File.extname(file.original_filename).casecmp?(".csv")
      render json: { error: "Invalid file format" }, status: :unprocessable_entity
      return
    end

    # Read the CSV file and parse its contents
    csv_text = file.read.force_encoding("UTF-8")

    unless csv_text.valid_encoding?
      render json: { error: "CSV must use valid UTF-8 encoding" },
            status: :unprocessable_entity
      return
    end
    
    # Remove a UTF-8 BOM if the exported CSV includes one
    csv_text = csv_text.delete_prefix("\uFEFF")

    csv = CSV.parse(csv_text, headers: true)
    Record.transaction do
      csv.each { |row| Record.create!(row.to_h) }
      # If any record creation fails, the transaction will be rolled back automatically
    end

    render json: {"success" => true}, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
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
      params.require(:record).permit(:title, :artist_name, :genre, :release_year)
    end
end
