class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.belongs_to :user
      t.string :title
      t.text :description
      t.integer :type
      t.boolean :live
      t.text :from_url
      t.text :url
      t.decimal :price, precision: 10, scale: 2, default: 0.0, null: false

      t.timestamps
    end


    create_table :customer_transactions do |t|
      t.belongs_to :product
      t.string :name
      t.string :email
      t.decimal :price, precision: 10, scale: 2, default: 0.0, null: true
      t.string :stripe_payment_id
      t.string :status
      t.integer :custompay_userid  # Add the custompay_userid column
      t.references :user, foreign_key: true
      t.references :funnel, foreign_key: { to_table: :funnels }, optional: true
      t.references :step, foreign_key: { to_table: :steps }, optional: true

      t.timestamps
    end


  end
end
