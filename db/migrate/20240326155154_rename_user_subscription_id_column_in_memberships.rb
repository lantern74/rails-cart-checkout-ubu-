class RenameUserSubscriptionIdColumnInMemberships < ActiveRecord::Migration[7.1]
  def change
    rename_column :memberships, :user_subscription_id, :rebilly_subscription_id
  end
end
