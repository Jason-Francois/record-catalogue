class CreateRecordGenres < ActiveRecord::Migration[8.1]
  def change
    create_table :record_genres do |t|
      t.references :record, null: false, foreign_key: true
      t.references :genre, null: false, foreign_key: true

      t.index [:record_id, :genre_id], unique: true
      t.timestamps
    end
  end
end
