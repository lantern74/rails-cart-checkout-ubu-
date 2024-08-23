# app/controllers/products_steps_controller.rb

class ProductsStepsController < ApplicationController
  before_action :authenticate_user! # Add any other before actions as needed

  def connect
    @step = Step.find(params[:step_id])
    @product = Product.find(params[:product_id])

    # Connect the product to the step as needed
    @step.products << @product

    respond_to do |format|
      format.js # Assuming you're handling this via AJAX
    end
  end
end
