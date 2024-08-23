class PaymentController < ApplicationController
  before_action :set_payment, only: %i[ show edit update destroy ]

  def index
  end

  def new
  end

  def show
    @user = User.where(id: params[:id]).first
      if Rails.env.production? #this is only for the custom form
        @payment_live=true;
      else
        @payment_live=false; #this exact parameter is payment_intents_controller too.
      end
    if @user.nil? then redirect_to login_url end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_payment
      # @payment = Product.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def payment_params
      params.require(:payment).permit(:title, :price, :description, :live)
    end

end
