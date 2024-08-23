class CreateWorktasks < ActiveRecord::Migration[6.1]
  def change

    create_table :worktask_types do |t|
      t.string :name
      t.string :kind

      t.timestamps
    end

    create_table :worktasks do |t|
      t.string :name
      t.string :from_name
      t.string :from_email
      t.string :subject_line
      t.text :templates
      t.text :message
      t.string :search_term
      t.string :fb_post_id

      t.integer :worktask_type_id, foreign_key: { to_table: :worktask_types }
      t.integer :order  # Add the order column

      t.references :workflow, null: false, foreign_key: true

      t.timestamps
    end
  end
end
