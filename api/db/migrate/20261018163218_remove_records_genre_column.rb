class RemoveRecordsGenreColumn < ActiveRecord::Migration[8.1]
  def change
    remove_column :records, :genre, :string
  end
end
