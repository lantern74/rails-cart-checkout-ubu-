class AddDelayToWorktasks < ActiveRecord::Migration[6.1]
  def change
    add_column :worktasks, :delay, :integer
    add_column :worktasks, :unit_of_time, :integer
  end
end
