class AddPlanIdToMemberships < ActiveRecord::Migration[7.1]
  def change
    add_column :memberships, :rebilly_plan_id, :string
  end
end
