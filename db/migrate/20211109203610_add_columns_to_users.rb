class AddColumnsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :pk_test, :string
    add_column :users, :sk_test, :string
    add_column :users, :pk_live, :string
    add_column :users, :sk_live, :string

    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :phone, :string
    add_column :users, :address, :string
    add_column :users, :apartment, :string
    add_column :users, :city, :string
    add_column :users, :postalCode, :string
    add_column :users, :region, :string
    add_column :users, :country, :string
    add_column :users, :promo_code, :string

    #this is their main site
    add_column :users, :website, :string



    add_column :users, :deactivated, :boolean

  end
end
