class AddConfirmableToUsers < ActiveRecord::Migration[6.0]  # Adjust the version based on your Rails version
  def change
    add_column :users, :confirmation_token, :string
    add_column :users, :confirmed_at, :datetime
    add_column :users, :confirmation_sent_at, :datetime
    add_column :users, :unconfirmed_email, :string  # If you have :reconfirmable enabled

    add_column :users, :current_sign_in_at, :datetime
    add_column :users,  :last_sign_in_at, :datetime
    add_column :users,  :current_sign_in_ip, :string
    add_column :users,  :last_sign_in_ip, :string
    add_column :users,  :sign_in_count, :integer

    add_index :users, :confirmation_token, unique: true
  end
end
