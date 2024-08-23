class ProductsController < ApplicationController
  before_action :set_product, only: %i[ show edit update destroy ]
  after_action :save_my_previous_url, only: [:show]
  before_action :authenticate_user!, only: [:index, :new, :update, :destroy ]

  def save_my_previous_url
    #note: Back url. When you go back with the form sometimes it doesn't go back because the form is submitted.
    # https://stackoverflow.com/questions/16213176/link-back-to-page-visited-before-form
    # session[:previous_url] is a Rails built-in variable to save last url.
    session[:my_previous_url] = URI(request.referer || '').path
  end

  # GET /products or /products.json
  def index
     if !user_signed_in? then return end
    @products = Product.where(user_id: current_user.id).order(created_at: :desc)
    # @product = Product.find(params[:id])

    @back_url = session[:my_previous_url]
  end

  # GET /products/1 or /products/1.json
  def show
    @user = User.where(id: @product.user_id).first
    @back_url = session[:my_previous_url]

  end

  ## begin of import products from Stripe stuff -------------
  def import
    # if Stripe is not connected:
    return redirect_to payment_integration_index_path, alert: 'Please connect to Stripe first.' if current_user.stripe_account_id.nil?

    @product = Product.new
  load_stripe_products
  render 'import'
  end


  def create_from_import
    # if Stripe is not connected:
    return redirect_to payment_integration_index_path, alert: 'Please connect to Stripe first.' if current_user.stripe_account_id.nil?

    product_id = params[:stripe_product]



    #this returns 2 arrays for each of the values below
    product,price = load_stripe_products(product_id)

    product = current_user.products.create!(
      title: product['name'],
      description: product['description'], # Update this with the actual description attribute from Stripe if available
      stripe_image_url: product['images']&.first,
      price_type: price.type,
      price: price.unit_amount / 100.0,
      billing_period: price.recurring&.interval,
      trial_period: price.recurring&.trial_period_days,
      number_of_payments: price.recurring&.interval_count,
      # setup_fee: price.recurring&.setup_fee&.amount / 100.0,
      price_id: product[:price_id],
      live_product_id: product['id'],
      test_product_id: product['id'],
      )

    redirect_to products_path, notice: 'Product created successfully'

  end


## end of import products from Stripe stuff -------------


  # GET /products/new
  def new
    @product = Product.new
  end

  # GET /products/1/edit
  def edit
  end

  # POST /products or /products.json
  def create

        # if params[:product][:url]!='' && !params[:product][:url].include?("http")
        #   params[:product][:url] = "https://" << params[:product][:url]
        # end
        # if params[:product][:from_url]!='' && !params[:product][:from_url].include?("http")
        #   params[:product][:from_url] = "https://" << params[:product][:from_url]
        # end

        @product = Product.new(product_params.merge(:user_id => current_user.id))

    # or the one below works too
    # @product = current_user.products.build(product_params)
      response = save_stripe_product(
        @product.title,
        @product.price,
        'usd',
        @product.description,
        @product.price_type,  # Provide the actual value for price_type
        @product.billing_period,    # Provide the actual value for billing_period
        @product.trial_period,    # Provide the actual value for trial_period
        @product.number_of_payments, # Provide the actual value for number_of_payments
        { key: 'value' }
      )

    livemode = response[:product].livemode
    if livemode
      @product.live_product_id = response[:product].id
    else
      @product.test_product_id = response[:product].id
    end



    respond_to do |format|
        if @product.save
          format.html { redirect_to products_path, notice: "Product was successfully created." }
          format.json { render :show, status: :created, location: @product }
        else
          format.html { render :new, status: :unprocessable_entity }
          format.json { render json: @product.errors, status: :unprocessable_entity }
        end

    end
  end

  def update
  respond_to do |format|
    if @product.update(product_params)
      # Update the corresponding Stripe product and price
      response = update_stripe_product(
        @product.live_product_id || @product.test_product_id,
        @product.title,
        @product.price,
        'usd',
        @product.description,
        @product.price_type,
        @product.billing_period,
        @product.trial_period,
        @product.number_of_payments,
        { key: 'value' }
      )

      puts "Stripe API Response: #{response.inspect}"

      livemode = response[:product].livemode if response[:product]
      if livemode
        @product.live_product_id = response[:product].id
      else
        @product.test_product_id = response[:product].id
      end

      format.html { redirect_to products_path, notice: "Product was successfully updated." }
      format.json { render :show, status: :ok, location: @product }
    else
      format.html { render :edit, status: :unprocessable_entity }
      format.json { render json: @product.errors, status: :unprocessable_entity }
    end
  end
end




  # DELETE /products/1 or /products/1.json
  def destroy
    if  @product.user_id!=current_user.id then return end

      @product.destroy
    respond_to do |format|
      format.html { redirect_to products_url, notice: "Product was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private



 def update_stripe_product(product_id, name, unit_amount, currency, description, price_type, billing_period, trial_period, number_of_payments, metadata = {})
  connected_account_id = current_user.stripe_account_id

  # Retrieve the access token for the connected account
  access_token_response = Stripe::OAuth.token({
    grant_type: 'refresh_token',
    refresh_token: current_user.stripe_refresh_token,
    client_id: 'ca_GCFUcdyGc6XyCV4B3cnk0g1vatG5Eacj',
    client_secret: 'sk_test_Ifmbk3q6zkHLgvyiFRm2TsjQ',
  })
  stripe_key = access_token_response['access_token']

  begin
    # Retrieve the existing product
    existing_product = Stripe::Product.retrieve(
      product_id,
      { stripe_account: connected_account_id, api_key: stripe_key }
    )

    # Create a new price for the product
    new_price = Stripe::Price.create(
      {
        product: product_id,
        unit_amount: (unit_amount * 100).to_i,
        currency: currency,
        recurring: price_type == 'recurring' ? { interval: billing_period, trial_period_days: trial_period, interval_count: number_of_payments } : nil,
      },
      { stripe_account: connected_account_id, api_key: stripe_key }
    )

    # Set the new price as the default price for the product
    updated_product = Stripe::Product.update(
      product_id,
      {
        default_price: new_price.id,
        name: name,
        description: description,
        metadata: metadata,
      },
      { stripe_account: connected_account_id, api_key: stripe_key }
    )

    # Return success response
    return { success: true, product: updated_product, price: new_price }
  rescue Stripe::StripeError => e
    # Return error response
    return { success: false, error: e.message, product: nil, price: nil }
  end
end

    def format_updated_product_and_price(updated_product, updated_price)
      { success: true, product: updated_product, price: updated_price }
    end



    def save_stripe_product(name, unit_amount, currency, description, price_type, billing_period, trial_period, number_of_payments, metadata = {})
      connected_account_id = current_user.stripe_account_id

      # Retrieve the access token for the connected account
      access_token_response = Stripe::OAuth.token({
        grant_type: 'refresh_token',
        refresh_token: current_user.stripe_refresh_token,
        client_id: 'ca_GCFUcdyGc6XyCV4B3cnk0g1vatG5Eacj',
        client_secret: 'sk_test_Ifmbk3q6zkHLgvyiFRm2TsjQ',
      })
      stripe_key = access_token_response['access_token']

      begin
        # Create a new product
        product = Stripe::Product.create(
          {
            name: name,
            type: 'service', # or 'good' depending on your use case
            description: description,
            metadata: metadata,
          },
          { stripe_account: connected_account_id, api_key: stripe_key }
        )

        # Ensure unit_amount is an integer (convert from float if needed)
        unit_amount_cents = (unit_amount * 100).to_i



        # Create a new price for the product
        price = Stripe::Price.create(
          {
            product: product.id,
            unit_amount: unit_amount_cents,
            currency: currency,
             recurring: price_type == 'recurring' ? { interval: billing_period, trial_period_days: trial_period, interval_count: number_of_payments } : nil,
          },
          { stripe_account: connected_account_id, api_key: stripe_key }
        )


        # Set the created price as the default price for the product
        Stripe::Product.update(
        product.id,
        {
          default_price: price.id,
          metadata: {

          }
        },
          { stripe_account: connected_account_id, api_key: stripe_key }
        )


        # Return success response
        return { success: true, product: product, price: price }
      rescue Stripe::StripeError => e
        # Return error response
        return { success: false, error: e.message }
      end
    end



    def load_stripe_products(prod_id=nil)
      connected_account_id = current_user.stripe_account_id
      # Retrieve the access token for the connected account
      access_token_response = Stripe::OAuth.token({
        grant_type: 'refresh_token',
        refresh_token: current_user.stripe_refresh_token,
        client_id: 'ca_GCFUcdyGc6XyCV4B3cnk0g1vatG5Eacj',
        client_secret: 'sk_test_Ifmbk3q6zkHLgvyiFRm2TsjQ',
      })
      stripe_key = access_token_response['access_token']

      if prod_id
        # Code to execute if id is not nil
        # if you want to get only 1 product
         product = Stripe::Product.retrieve(prod_id, { stripe_account: connected_account_id, api_key: stripe_key })
         price_id = product.default_price
         price = Stripe::Price.retrieve(price_id, api_key: stripe_key)
       return product, price
      else
        # Code to execute if id is nil
        # if you want to get all products
      @stripe_products = Stripe::Product.list({ limit: 100 }, { stripe_account: connected_account_id, api_key: stripe_key })
      currencies={'usd'=>'$','eur'=>'€','gbp'=>'£','jpy'=>'¥','aud'=>'A$','chf'=>'CHF','sek'=>'SEK','nok'=>'NOK','dkk'=>'DKK','pln'=>'zł','czk'=>'Kč','bgn'=>'лв','hrk'=>'kn','huf'=>'Ft','ron'=>'RON'}
      @formatted_products = @stripe_products.data.map do |product|
          price_id = product.default_price
          next unless price_id
          price = Stripe::Price.retrieve(price_id, api_key: stripe_key)
          currency_symbol = currencies[price.currency.downcase] || '$'
          {
            id: product.id,
            name_with_price: "#{currency_symbol}#{'%.2f' % (price['unit_amount'] / 100.0)} - #{product['name']} [#{product.id}]",
            price_id: price_id,
          }

      end
    end






    end

  # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_params
      params.require(:product).permit(:title, :price, :description, :live, :type, :product_image, :from_url, :url,:price_type, :billing_period, :trial_period, :number_of_payments, :setup_fee)
    end
end
