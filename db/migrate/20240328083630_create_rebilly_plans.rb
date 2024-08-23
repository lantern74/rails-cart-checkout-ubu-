class CreateRebillyPlans < ActiveRecord::Migration[7.1]
  def change
    create_table :rebilly_plans do |t|

      t.string :rebilly_plan_id
      t.string :plan_name # Name of the plan
      t.text :plan_description
      t.integer :price # Added price column
      t.integer :trial_days # Added trial_days column
      t.text :notes_for_admin
      t.string :billing_cycle # Denoting monthly vs annual

      t.timestamps
    end
        add_index :rebilly_plans, :rebilly_plan_id, unique: true
  end
end
