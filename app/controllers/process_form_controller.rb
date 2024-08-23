# app/controllers/process_form_controller.rb
class ProcessFormController < ApplicationController
  include EncryptionHelper
  def dynamic_form
    if userevents_params.key?(:tricky_field) && userevents_params[:tricky_field].present?
      # Redirect or perform other actions
      #steps_url = root_url + "/funnels/1/steps/1"
      steps_url = root_url + "steps/"+userevents_params[:step_id]
      redirect_to steps_url and return
    end

    # if contact has previously signed up for the funnel and is signing up again, delete existing scheduled worktasks for that contact
    existing_contact = Contact.where(email: params[:contact][:email], funnel_id: decrypt_for_hidden_field(userevents_params[:funnel_id]), step_id: decrypt_for_hidden_field(userevents_params[:step_id])).first
    if existing_contact.present?
      ScheduledWorktask.where(contact_id: existing_contact.id).destroy_all
    end

    @contact = Contact.new(contact_params)
      @contact.user_id = decrypt_for_hidden_field(userevents_params[:user_id])
      @contact.funnel_id = decrypt_for_hidden_field(userevents_params[:funnel_id])
      @contact.step_id = decrypt_for_hidden_field(userevents_params[:step_id])


      # our objective:
      #  figure out if it's just an 'email', a 'custom form payment' or a 'payment for a product'


      @customer_transaction = CustomerTransaction.new(customer_transaction_params)



      # @customer_transaction = CustomerTransaction.new(customer_transaction_params)
      @customer_transaction.user_id = decrypt_for_hidden_field(userevents_params[:user_id])
      custompay_userid = @customer_transaction.custompay_userid # Initialize the variable

      if custompay_userid.nil? && @customer_transaction.product_id.nil? && !@contact.name.blank? && !@contact.email.blank?
        # this is an email
        p "----------------This is an email"
        @this_is_an_email=true
        # thankyou_url = root_url + "funnels/1/steps/1"


        @user = User.find(decrypt_for_hidden_field(userevents_params[:user_id]))
        @contact.funnel_id = decrypt_for_hidden_field(userevents_params[:funnel_id])
        @contact.step_id = decrypt_for_hidden_field(userevents_params[:step_id])




        #TODO: this has to be the next step
        @funnel = Funnel.find(@contact.funnel_id)
        begin
          @step = @funnel.steps.find(@contact.step_id)
          # @products = @step&.products || []
        rescue ActiveRecord::RecordNotFound
          # Handle the case where the step is not found
          @step = nil  # or any other appropriate handling
        end

        thankyou_url = "/steps/"+encrypt_for_hidden_field(@step.id)






      elsif @customer_transaction.product_id.nil?  && !@customer_transaction.name.blank? && !@customer_transaction.email.blank? #if a custom payment form, NOT a product
        p "This is a custom form"
        @this_is_a_product=false
        @this_is_an_email=false
        thankyou_url = ""
        @customer_transaction.product_id = 0 # this product ID is reserved for form payments without a price. It will save in the database with ID =0
        @customer_transaction.user_id = @customer_transaction.custompay_userid
        p @customer_transaction.user_id
        @user = User.find(@customer_transaction.custompay_userid)
      elsif  !@customer_transaction.name.blank? && !@customer_transaction.email.blank?  #if a product
        p "------------This is a product"
        @this_is_a_product=true
        @this_is_an_email=false
        @product = Product.where(id: @customer_transaction.product_id).first
        @customer_transaction.user_id = @product.user_id
        thankyou_url = @product.url
        if thankyou_url.nil? then thankyou_url="https://cartcheckout.net" end
        else
        p "-------------everything else failed"

          steps_url = root_url + "steps/"+userevents_params[:step_id]

          redirect_to steps_url and return #exit
        end


      #note: make sure that you don't send emails to somebody without PaymentID, because if they click submit twice it will send 2 emails.
      #note: also protect from hackers
      if !@this_is_an_email
        p "------------this is not an email"
        steps_url = root_url + "steps/"+userevents_params[:step_id]

        redirect_to steps_url and return if @customer_transaction.stripe_payment_id.nil? || @customer_transaction.stripe_payment_id == ''
      end


      if !@this_is_an_email # if not an email send them a reciept for payment
        UserMailer.welcome_email(@customer_transaction, @user, @product, @this_is_a_product, thankyou_url).deliver_now
      end

      #add email and name to SendFox
      # if @user.id==1
      #   first_name = @customer_transaction.name.split.first
      #   email = @customer_transaction.email
      #   lists = '304420'
      #   url = "https://api.sendfox.com/contacts"
      #   token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY3OWY1NmMwYTRjNWU5OTdiOGZmOTE5ZTg3MWJhODJmNjIzYTI4MzA1OWU4NTNhMzYwMDg0YzMyZTJhNjFjM2I0MmI0NTQ1MzhkZmNhNjFiIn0.eyJhdWQiOiI0IiwianRpIjoiNjc5ZjU2YzBhNGM1ZTk5N2I4ZmY5MTllODcxYmE4MmY2MjNhMjgzMDU5ZTg1M2EzNjAwODRjMzJlMmE2MWMzYjQyYjQ1NDUzOGRmY2E2MWIiLCJpYXQiOjE2MTg2MDM3ODUsIm5iZiI6MTYxODYwMzc4NSwiZXhwIjoxNjUwMTM5Nzg1LCJzdWIiOiIxNjk0Iiwic2NvcGVzIjpbXX0.bStqIQpHQMBMJydmxdDXtWu8obvGiNzKRbc05msbm9ASJakKiarO32zxcLKxv97W00rRpbK4_9V-1er20WsDw4GFboX9knGJGSMJbhoZwTM6aTApdKWejeqHz2EJTKZK-eYX0AY1dJC01dHeO5MM0r073EilYqf_Gx-VgnFgvO0cCyBFcJZ28HiN11ffO_DvpSMqG8SRvzG1gkQqIr-gYuJ721pPGMJaJ3FCdhYk3a7br6fDRYJNE2Y2r2Rq4uMxVLp2TGTefFDPAKJQOW8c7X5NMON5fHi1y1EXEWnJcbfMqED8eCNhnI9MkRB61hWewzqKcERUvarEw9SH1XfHWguu6jeILdUcVLPVb7OFe2JWQYbOYB68vU2woNlSHN8axvZkecqF5eotaLLGle7Tg_QMq88PA36-MP479-1v2FzdOmVrKyHY9HbN5rfYwu914ZCVPTxvyVakiQ1gwiDtMfksHLfap-sLDIGXVfUxu1oCSzYbEX696ELoQwPCdK13LQswtMf8RJn6o1EfDKyocMwF7zGMfNTm56uCoHIHvqwpChfy3vbax93gNO7e0Ws-oRiRLGaR1TMW3rYgaS3z8cxMaB8RLkyZX0CDIHNNjXyvnxwwNNJiz-3Sip-DngMT8GVbc1moosveqESK6P2KWIgtIvmxeGtOyIKOtdKt55o'
      #   response = HTTParty.post url, :body =>
      #   {
      #     "first_name"=>first_name,
      #     "email"=>email,
      #     "lists"=>lists,
      #   },
      #   :headers => {'Authorization' => "Bearer #{token}"}
      # end
      respond_to do |format|
        if @contact.save
            ##################################################################################
            # NICOLE
            # START THE TRIGGER ADDING TO THE WORKFLOW
            # Eugene to do: add the contact_id and the workflow_id(from params) to subscription table
            ##################################################################################

            # workflow = Workflow.find_by(id: params[:workflow_id])
            # workflow = Workflow.find_by(id: 1)

            step = Step.find(@contact.step_id)
            workflow_id = step.workflow_id
            workflow = workflow_id.present? ? Workflow.find_by(id: workflow_id) : nil


            if workflow.present?
              # Create a new subscription with the associated contact and workflow
              subscription = Subscription.new(contact: @contact, workflow: workflow)

              if subscription.save
                # Subscription saved successfully
              else
                # Subscription failed to save
                # Handle the error, you can inspect subscription.errors.full_messages for details
              end

              # add scheduled worktasks
              ScheduledWorktask.schedule_worktasks(@contact, workflow.id)
            else
              # Handle the case when the workflow couldn't be found
            end


            format.html {
              if thankyou_url == ""
                redirect_to success_path(@contact), notice: ""
              else
              redirect_to thankyou_url
            end
            }
            format.json { render :show, status: :created, location: @contact }
        else
          format.html { render :new, status: :unprocessable_entity }
          format.json { render json: @contact.errors, status: :unprocessable_entity }
        end

        @contact.errors.full_messages.each do |message|
          puts message
        end

      end

  end
  # def process_contact_form
  #   # Your custom logic to process a contact form
  # end

  # def process_other_form
  #   # Your custom logic for another form
  # end

  private



    def flatten_params(params, parent_key = nil)
      flat_params = {}
      params.each do |key, value|
        key = "#{parent_key}_#{key}" if parent_key
        if value.is_a?(ActionController::Parameters)
          flat_params.merge!(flatten_params(value, key))
        else
          flat_params[key.to_sym] = value
        end
      end
      flat_params
    end

    def userevents_params
      userevents_params = params.require(:userevents).permit(:user_id, :funnel_id, :step_id, :tricky_field )
                                          .transform_values { |value| value.blank? ? nil : value }
    end

    def contact_params
      contact_params = params.require(:contact).permit(:name, :email, :status)
    end

    def customer_transaction_params
      customer_transaction_params = params.require(:customer_transaction).permit(:product_id, :stripe_payment_id, :price, :custompay_userid)
    end

    def form_params
      permitted_params = params.permit( :authenticity_token)

    end
end
