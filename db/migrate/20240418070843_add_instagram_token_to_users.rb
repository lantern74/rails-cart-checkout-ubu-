class AddInstagramTokenToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :instagram_token, :string
  end
end
