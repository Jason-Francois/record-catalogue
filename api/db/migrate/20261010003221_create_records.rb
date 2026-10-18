class CreateRecords < ActiveRecord::Migration[8.1]
  def change
    create_table :records do |t|
      t.string :title
      t.string :artist_name
      t.string :genre
      t.integer :release_year

      t.timestamps
    end
  end
end
