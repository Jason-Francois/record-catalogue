PAGE_SIZE = 12

class Record < ApplicationRecord
  validates :title, :artist_name, presence: true
  after_commit :fetch_album_cover, on: [ :create, :update ]
  has_many :record_genres, dependent: :destroy
  has_many :genres, through: :record_genres, dependent: :destroy
  def self.search(params)
    records = all
    genres = params[:genres].to_s.split(",").filter(&:present?) if params[:genres].present?
    if params[:query].present?
      term = "%#{sanitize_sql_like(params[:query])}%"
      records = records.where("title LIKE :query ESCAPE '\\' OR artist_name LIKE :query ESCAPE '\\'", query: term)
    end
    if genres.present?
      records = records.joins(:genres)
                      .where(genres: { id: genres })
                      .distinct
    end
    year_to = params[:year_to].to_i if params[:year_to].present?
    year_from = params[:year_from].to_i if params[:year_from].present?

    # Swap year_from and year_to if they are in the wrong order.
    if year_to.present? && year_from.present? && year_to < year_from
      year_to, year_from = year_from, year_to
    end

    # Filter by genre and release year range
    records = records.where("release_year >= ?", year_from) if year_from.present?
    records = records.where("release_year <= ?", year_to) if year_to.present?

    page = params[:page].to_i if params[:page].present?
    page = 1 if page.nil? || page <= 0

    # Handle pagination
    total_records = records.count
    total_pages = (total_records.to_f / PAGE_SIZE).ceil
    
    # Order records by title, using id as a tiebreaker
    records = records.order(title: :asc, id: :asc)

    # Apply pagination only if the view is not "carousel"
    if params[:view] != "carousel"
      records = records.offset((page - 1) * PAGE_SIZE).limit(PAGE_SIZE)
    end
    records = records.includes(:genres)
    resp = {
      records: records.as_json(include: :genres),
      pagination: {
        total_records: total_records,
        total_pages: total_pages,
        current_page: page
      }
    }
    resp
  end

  private

  def fetch_album_cover
    if !saved_change_to_image_url? && title_or_artist_changed?
      FetchCoverArtJob.perform_later(self)
    end
  end

  def title_or_artist_changed?
    saved_change_to_title? || saved_change_to_artist_name?
  end
end
