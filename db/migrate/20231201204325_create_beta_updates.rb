class CreateBetaUpdates < ActiveRecord::Migration[6.1]
  def change
    create_table :beta_updates do |t|
      t.string :name
      t.text :description

      t.timestamps
    end

    create_table :user_beta_updates do |t|
      t.bigint :user_id  # Add user_id column

      t.bigint :beta_update_id
      t.boolean :enabled

      t.timestamps
    end

    # MariaDB-friendly syntax for unique index
    add_index :user_beta_updates, [:user_id, :beta_update_id], unique: true

    # MariaDB-friendly syntax for foreign key constraints
    add_foreign_key :user_beta_updates, :users, column: :user_id, on_delete: :cascade
    add_foreign_key :user_beta_updates, :beta_updates, column: :beta_update_id, on_delete: :cascade

  end
end
