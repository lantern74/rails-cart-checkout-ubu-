class CreateFunnels < ActiveRecord::Migration[6.1]
  def change

    create_table :funnels do |t|

      t.string :title
      t.string :path
      t.string :head_tracking
      t.string :body_tracking
      t.string :payment_mode
      t.string :domain
      t.string :gdpr
      t.string :image_optimization
      t.references :user, foreign_key: true
      t.timestamps
    end


    create_table :workflows do |t|
      t.string :name
      t.string :kind
      t.string :status
      t.integer :total_enrolled
      t.integer :active_enrolled
      t.references :user, foreign_key: true

      t.timestamps
    end



    create_table :step_types do |t|
      t.string :name
      t.string :kind
      t.timestamps
    end


    create_table :steps do |t|
      t.string :title
      t.string :thumb
      t.string :step_path
      t.text :description
      t.text :seo_metadata
      t.string :tracking_code
      t.text :custom_css
      t.string :background
      t.text :typography
      t.text :popup_html
      t.integer :step_type_id, foreign_key: { to_table: :step_types }
      t.text :large_html_blob  # Add the large_html_blob column
      t.integer :order  # Add the order column
      t.references :funnel, foreign_key: true
      t.references :workflow, foreign_key: { to_table: :workflows },  optional: true
      t.timestamps
    end



    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.string :status

      t.references :user, foreign_key: true
      t.references :funnel, foreign_key: { to_table: :funnels }, optional: true
      t.references :step, foreign_key: { to_table: :steps }, optional: true

      t.timestamps
    end

    create_table :subscriptions do |t|
      t.bigint :contact_id
      t.bigint :workflow_id
      t.index ["contact_id"], name: "index_subscriptions_on_contact_id"
      t.index ["workflow_id"], name: "index_subscriptions_on_workflow_id"
    end

    add_foreign_key "subscriptions", "contacts"
    add_foreign_key "subscriptions", "workflows"





  end
end
