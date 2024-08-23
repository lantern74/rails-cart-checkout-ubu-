require 'httparty'

class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_account_update_params, only: [:update]
  before_action :extract_fragment

  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, if: :devise_controller?
  before_action :configure_permitted_parameters

  def create
    existing_user_already_exists = false #if anything goes wrong, then set existing_user_already_exists to true

    #check if existing user is already in the database
    existing_user = User.find_by(email: sign_up_params[:email])
    if existing_user.nil?
      existing_user_already_exists = false
    else
      p "email already exists"
      flash[:alert] = "An account with this email already exists. Please log in or use a different email."
      existing_user_already_exists = true
    end

    # p params
    # p sign_up_params
    payment_token = params[:rebilly_token]

    if !existing_user_already_exists
      #? Here's what's going to happen next:
      #? 1. We are going to create the customer
      #? 2. We are going to subscribe them via add subscription
      #? 3. Then we are going to make a transaction to process the payment
      #? 4. and then we are going to save them into DB

      #! 1. create a customer: ---------------------
      customer_data = {}
            # Call RebillyService to create the customer
      @customer = RebillyService.create_customer(payment_token, customer_data)
      payment_instrument_id = @customer['defaultPaymentInstrument']['paymentInstrumentId']
      # p @customer
      # Check if the customer creation was successful
      if @customer.present?
        # 2. Then we are going to try to process the payment
        # Create a subscription
        plan_id = session[:plan_id]  # this one works, be careful with the right name
        quantity = 1
        billing_address = {
          firstName: sign_up_params[:first_name],
          lastName: sign_up_params[:last_name],
          organization: sign_up_params[:company_name],
          address: sign_up_params[:address],
          address2: sign_up_params[:apartment],
          city: sign_up_params[:city],
          region: sign_up_params[:region],
          country: sign_up_params[:country],
          postalCode: sign_up_params[:postal_code],
          emails: [
            { label: 'main', value: sign_up_params[:email], primary: true }
          ],
          phoneNumbers: [
            { label: 'main', value: sign_up_params[:phone], primary: true }
          ]
        }

        #! 2. subscribe them:  ---------------------
        @subscription = RebillyService.add_subscription(
        @customer['id'],
        plan_id,
        quantity,
        billing_address,
        payment_instrument_id
        )
        # p  "@subscription:"
        # p  @subscription
        # # p  @subscription["paymentInstrumentId"]
        # p "payment_token:"
        # p payment_token

        #! 3. create a transaction:  ---------------------
        # Call RebillyService to create the transaction
        @transaction = RebillyService.create_transaction(
        @customer['id'],
        payment_token,
        'USD',
        '0',
        @subscription["initialInvoiceId"])
            
        result = @transaction["result"]
          if result == "approved" then
            #success
            payment_successful=true
          else
            payment_declined=true
          end
          billingAddress=[]

        # billingAddress = {
        #   'firstName' => 'John',
        #   'lastName' => 'Doe',
        #   'organization' => 'Test LTD',
        #   'address' => 'Test street 5',
        #   'address2' => 'Test house 5',
        #   'city' => 'New York',
        #   'region' => 'Long Island',
        #   'country' => 'US',
        #   'postalCode' => '123456',
        #   'emails' => [
        #     {
        #       'label' => 'main',
        #       'value' => 'johndoe@testemail.com',
        #       'primary' => true,
        #     },
        #     {
        #       'label' => 'secondary',
        #       'value' => 'otheremail@testemail.com',
        #     },
        #   ],
        #   'phoneNumbers' => [
        #     {
        #       'label' => 'work',
        #       'value' => '+123456789',
        #       'primary' => true,
        #     },
        #     {
        #       'label' => 'home',
        #       'value' => '+9874654321',
        #     },
        #   ],
        #   'dob' => '2000-06-01',
        # }
        # Call a method to process payment and check if it was successful
        #  payment_successful = process_payment(payment_token,sign_up_params)
        # let's send this param["rebilly_token"] to Rebilly
      end
    end ### end of  !existing_user_already_exists

    if payment_successful # and the user doesn't exist - if user exists the payment won't be successful
      build_resource(sign_up_params)
      resource.confirmation_token = resource.confirmation_token.presence || SecureRandom.urlsafe_base64
      resource.confirmation_sent_at = Time.current
      resource.save(validate: false)  # Save the user with the confirmation token

      # save subscription id generated by rebilly to memberships table
      Membership.create(user_id: resource.id, rebilly_subscription_id: @subscription['id'], rebilly_plan_id: plan_id)

      render json: { success: true, redirect_url: password_setup_path(token: resource.confirmation_token) }

      # redirect_to password_setup_path(token:resource.confirmation_token)
    else

    errors = []
    errors << "An account with this email already exists. Please try a different email." if existing_user_already_exists
    errors << "Your card is declined. Please check your payment details and try again." if payment_declined
    render json: { success: false, errors: errors }, status: :unprocessable_entity

    # render 'new' # or whatever your view's name is

    end
  end # of def

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  def update

      if   params[:user]['website']!='' && !params[:user]['website'].include?("http")
        params[:user]['website'] = "https://" + params[:user]['website']
      end

      super do |resource|
        if resource.errors.any?
          # Handle errors here
          flash[:alert] = "Failed to update account. Please check the errors."
          Rails.logger.error "Failed to update account. Errors: #{resource.errors.full_messages.join(', ')}"
        else
          flash[:notice] = "Account successfully updated"
          Rails.logger.info "Account successfully updated"
        end
      end

  end


  protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  def extract_fragment
    @fragment = params[:section] if params[:section].present?
  end


  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:stripe_account_id, :first_name, :last_name, :email, :phone, :address, :apartment, :city, :zip, :state, :promo_code, :country, :company_name])

    devise_parameter_sanitizer.permit(:account_update) do |u|
      u.permit(:address, :apartment, :city, :zip, :country, :state, :first_name,  :last_name, :email, :phone, :website, :pk_test, :sk_test, :pk_live, :sk_live, :current_password,  :password, :password_confirmation, :stripe_account_id)
    end
  end

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:card_number, :expiration_date, :cvc])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :phone, :email, :current_password, :password, :password_confirmation,  :promo_code, :region, :country, :state, :postalCode, :company_name])
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    # devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :phone, :email, :current_password, :password, :password_confirmation,  :promo_code])
    devise_parameter_sanitizer.permit(:account_update, keys: [:pk_test,:sk_test, :pk_live, :sk_live,:first_name, :last_name, :phone, :email,:current_password, :password, :password_confirmation, :website])

  end

  def after_update_path_for(resource)
      flash[:notice] = "Account succesfully updated"
      products_path
  end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

  ##? EU defs for processing payments
  def process_payment(payment_token, customer_data)
    #  response = RebillyService.create_customer(payment_token, customer_data)
  end
end
