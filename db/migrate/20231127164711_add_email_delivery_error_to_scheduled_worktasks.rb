class AddEmailDeliveryErrorToScheduledWorktasks < ActiveRecord::Migration[6.1]
  def change
    add_column :scheduled_worktasks, :email_delivery_error, :string
  end
end
