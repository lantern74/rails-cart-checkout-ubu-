class CreateImageLists < ActiveRecord::Migration[7.1]
  def change
    create_table :image_lists do |t|
      t.references :user, null: false, foreign_key: true
      t.string :imgid
      t.string :url

      t.timestamps
    end
  end
end
