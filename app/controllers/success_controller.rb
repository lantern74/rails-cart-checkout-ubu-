class SuccessController < ApplicationController


  def show
   @customer_transaction = CustomerTransaction.find(params[:id])

  if @customer_transaction.custompay_userid.nil?
    @product = Product.find(@customer_transaction.product_id)
    @user = User.find(@product.user_id)
    @this_is_a_product=true
    @thankyou_url=@product.url
  else
    @user = User.find(@customer_transaction.custompay_userid)
    @thankyou_url=""
  end

  # p @user.name
  end

private



end
