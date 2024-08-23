class AddRebillyPlanRefToMemberships < ActiveRecord::Migration[7.1]
  def change
        add_foreign_key :memberships, :rebilly_plans, column: :rebilly_plan_id, primary_key: "rebilly_plan_id"

  end
end
