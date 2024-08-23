class CreateScheduledWorktasks < ActiveRecord::Migration[6.1]
  def change
    create_table :scheduled_worktasks do |t|
      t.references :contact, null: false, foreign_key: true
      t.references :worktask, null: false, foreign_key: true
      t.datetime :trigger_at
      t.datetime :completed_at

      t.timestamps
    end
  end
end
