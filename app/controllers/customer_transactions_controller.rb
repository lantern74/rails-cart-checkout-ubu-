  class CustomerTransactionsController < ApplicationController
  before_action :set_customer_transaction, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, only: [:index]


  def index
    @products = Product.where(user_id: current_user.id)
    @customer_transactions = CustomerTransaction.where(product_id: @products.ids).where(custompay_userid: nil).or(CustomerTransaction.where(custompay_userid: current_user.id)).or(CustomerTransaction.where(user_id: current_user.id)).order(created_at: :desc)


  end

  def show
  end

  def new
    @customer_transaction = CustomerTransaction.new
  end

  def edit
  end

  def create
  if params[:tricky_field] != ''
    redirect_to root_path and return
  end

      respond_to do |format|
        if @customer_transaction.save
          format.html {
            if thankyou_url == ""
              redirect_to success_path(@customer_transaction), notice: ""
            else
            redirect_to thankyou_url
          end
          }
          format.json { render :show, status: :created, location: @customer_transaction }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @customer_transaction.errors, status: :unprocessable_entity }
      end

      @customer_transaction.errors.full_messages.each do |message|
        puts message
      end

    end
  end


  def update
    respond_to do |format|
      if @customer_transaction.update(customer_transaction_params)
        format.html { redirect_to @customer_transaction, notice: "Customer was successfully updated." }
        format.json { render :show, status: :ok, location: @customer_transaction }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @customer_transaction.errors, status: :unprocessable_entity }
      end
    end
  end


  def destroy
    @customer_transaction.destroy
    respond_to do |format|
      format.html { redirect_to customer_transactions_url, notice: "Transaction was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_customer_transaction
      @customer_transaction = CustomerTransaction.find(params[:id])
    end

    # Now we gonna decrypt these values like userevents[user_id],userevents[funnel_id],etc
    # The files that encrypts it is in config/initializers and also in app/helpers
    def decrypt_from_hidden_field(encrypted_value)
      crypt = ActiveSupport::MessageEncryptor.new(Rails.application.config.encryption_key)
      crypt.decrypt_and_verify(encrypted_value)
    end


    # Only allow a list of trusted parameters through.
    def customer_transaction_params
      params.require(:customer_transaction).permit(:name, :email, :tricky_field, :product_id, :stripe_payment_id, :price, :custompay_userid)
    end
end
