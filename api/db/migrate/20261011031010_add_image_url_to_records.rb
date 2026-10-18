class AddImageUrlToRecords < ActiveRecord::Migration[8.1]
  def change
    add_column :records, :image_url, :string
  end
end
