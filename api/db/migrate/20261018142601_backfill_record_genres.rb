class BackfillRecordGenres < ActiveRecord::Migration[8.1]
  def up
    # Backfill the record_genres table based on the canonicalized genres of each record.
    Record.find_each do |record|
      current_genre = GenreCanonicalizer.canonicalize(record.genre)
      next if current_genre.blank?

      genre = Genre.find_or_create_by(name: current_genre)

      RecordGenre.find_or_create_by(record: record, genre: genre)
    end
  end
end