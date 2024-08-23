class PaymentIntegrationController < ApplicationController
  # require 'rest-client'

  before_action :authenticate_user!, only: [:connect]

  def connect
# locally:
   redirect_to "https://connect.stripe.com/oauth/v2/authorize?response_type=code&client_id=ca_GCFUcdyGc6XyCV4B3cnk0g1vatG5Eacj&scope=read_write&redirect_uri=http://localhost/payment_integration/callback&state=#{current_user.id}",allow_other_host: true
#live:ca_GCFUzcxREkrNgRjwGjABGeBi3Wyxm1np
# test:ca_GCFUcdyGc6XyCV4B3cnk0g1vatG5Eacj
    # on the server:
    # redirect_uri = "#{ENV['BASE_URL']}/payment_integration/callback"
    # redirect_to "https://connect.stripe.com/oauth/v2/authorize?response_type=code&client_id=ca_GCFUzcxREkrNgRjwGjABGeBi3Wyxm1np&scope=read_write&redirect_uri=#{redirect_uri}&state=#{current_user.id}"

  end

  def callback
    code = params[:code]
    user_id = params[:state]
    user = User.find(user_id)

    if code.blank?
          # Handle missing 'code' parameter
          redirect_to root_path, alert: 'Authorization code is missing.'
          return
      end

      #     # Make the request to obtain the OAuth token
      # begin
      #   response = RestClient.post(
      #     'https://connect.stripe.com/oauth/token',
      #     {
      #       grant_type: 'authorization_code',
      #       code: code,
      #       client_id: 'ca_GCFUcdyGc6XyCV4B3cnk0g1vatG5Eacj',
      #       client_secret: 'sk_test_Ifmbk3q6zkHLgvyiFRm2TsjQ', # Replace with your actual secret key
      #       # Note: No 'client_secret' is needed for test mode
      #     }
      #   )

      #   # Parse the JSON response
      #   json_response = JSON.parse(response.body)

      #   # Handle the JSON response as needed (store tokens, update user model, etc.)
      #   # For example, you might want to store the 'access_token' in your database.
      #   access_token = json_response['access_token']
      #   # ...

      #   # Redirect or render a success page
      #   redirect_to root_path, notice: 'Stripe account connected successfully!'
      # rescue RestClient::ExceptionWithResponse => e
      #   # Handle errors from the Stripe API
      #   error_response = JSON.parse(e.response.body)
      #   # Log or handle the error as needed
      #   p error_response['error_description']
      #   byebug
      #   redirect_to root_path, alert: "Error connecting Stripe account: #{error_response['error_description']}"
      # rescue StandardError => e
      #   # Handle other unexpected errors
      #   # Log or handle the error as needed
      #   redirect_to root_path, alert: 'An unexpected error occurred.'
      # end
      # end


    # Use the code to get the access token
    response = Stripe::OAuth.token({
      grant_type: 'authorization_code',
      code: code,
      client_id: 'ca_GCFUcdyGc6XyCV4B3cnk0g1vatG5Eacj',
      client_secret: 'sk_test_Ifmbk3q6zkHLgvyiFRm2TsjQ', # Replace with your actual secret key

    })

    # Store the connected account ID in the user's record
    connected_account_id = response['stripe_user_id']
    access_token = response['access_token']
    refresh_token = response['refresh_token']
    current_user.update(stripe_account_id: connected_account_id, stripe_access_token: access_token, stripe_refresh_token: refresh_token)

    # Redirect or show a success message
    redirect_to payment_integration_index_path, notice: 'Connected with Stripe successfully!'
  end



  def disconnect
    # Clear the connected Stripe account ID for the current user
    current_user.update(stripe_account_id: nil)
    redirect_to payment_integration_index_path, notice: 'Disconnected from Stripe!'
  end



end
