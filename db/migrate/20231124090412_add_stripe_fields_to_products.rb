class AddStripeFieldsToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :stripe_image_url, :text
    add_column :products, :price_type, :string
    add_column :products, :billing_period, :string
    add_column :products, :trial_period, :integer
    add_column :products, :number_of_payments, :integer
    add_column :products, :setup_fee, :decimal
    add_column :products, :price_id, :string
    add_column :products, :live_product_id, :string
    add_column :products, :test_product_id, :string
  end
end
