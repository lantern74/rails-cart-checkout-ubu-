# note: Read README how this works
class PaymentIntentsController < ApplicationController

  def create


    if ! params[:user_id].nil? #custom form
        @amount = params[:price].to_f*100
        @user = User.where(id: params[:user_id]).first
        if Rails.env.production? #this is only for the custom form
          @payment_live=true;
          Stripe.api_key =  @user.sk_live
        else
          @payment_live=false; #this exact parameter is payment_controller too.
          Stripe.api_key =  @user.sk_test
        end
    end

    if ! params[:id].nil? #product
        @product = Product.find(params[:id])
        @amount = @product.price*100
        @user = User.where(id: @product.user_id).first
        if @product.live
           Stripe.api_key =  @user.sk_live
          else
            Stripe.api_key =  @user.sk_test
        end
    end


    payment_intent = Stripe::PaymentIntent.create(
      amount: @amount.floor,
      currency: 'usd',
      metadata: {name: params[:name], email: params[:email]},
    )


    render json: {
      id: payment_intent.id,
      client_secret: payment_intent.client_secret
    }

  end


  private
    # Only allow a list of trusted parameters through.
    def paymentintent_params
     #note:  :id is used for products and it's only working from the products#show. :user_id is used for users and it's working with payment#show only.
      params.require(:paymentintent).permit(:id, :user_id, :price, :name, :email)
    end

end
