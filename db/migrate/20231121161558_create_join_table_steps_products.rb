class CreateJoinTableStepsProducts < ActiveRecord::Migration[6.1]
  def change
    create_join_table :steps, :products do |t|
        t.index [:step_id, :product_id]
        t.index [:product_id, :step_id]
    end
  end
end
