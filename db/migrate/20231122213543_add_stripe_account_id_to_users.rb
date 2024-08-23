class AddStripeAccountIdToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :stripe_account_id, :string
    add_column :users, :stripe_access_token, :string
    add_column :users, :stripe_refresh_token, :string
  end
end
