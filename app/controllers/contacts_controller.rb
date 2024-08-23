class ContactsController < ApplicationController
  before_action :set_contact, only: %i[ show edit update destroy ]

  # GET /contacts or /contacts.json
  def index
    @contacts = Contact.all
  end

  # GET /contacts/1 or /contacts/1.json
  def show
  end

  # GET /contacts/new
  def new
    @contact = Contact.new
  end

  # GET /contacts/1/edit
  def edit
  end

  # POST /contacts or /contacts.json
  def create
    if params[:tricky_field] != ''
      redirect_to root_path and return
    end


    @contact = Contact.new(contact_params)
    @contact.user_id = decrypt_from_hidden_field(params[:user_id])
    @contact.funnel_id = decrypt_from_hidden_field(params[:funnel_id])
    @contact.step_id = decrypt_from_hidden_field(params[:step_id])

    # if this is only an email then do only email
    # if this contains payment information then do something else
    # SaveCustomerTransaction.create_record(contact_params)


    respond_to do |format|
      if @contact.save
        format.html { redirect_to contact_url(@contact), notice: "Contact was successfully created." }
        format.json { render :show, status: :created, location: @contact }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /contacts/1 or /contacts/1.json
  def update
    respond_to do |format|
      if @contact.update(contact_params)
        format.html { redirect_to contact_url(@contact), notice: "Contact was successfully updated." }
        format.json { render :show, status: :ok, location: @contact }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /contacts/1 or /contacts/1.json
  def destroy
    @contact.destroy

    respond_to do |format|
      format.html { redirect_to contacts_url, notice: "Contact was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contact
      @contact = Contact.find(params[:id])
    end

    def decrypt_from_hidden_field(encrypted_value)
      crypt = ActiveSupport::MessageEncryptor.new(Rails.application.config.encryption_key)
      crypt.decrypt_and_verify(encrypted_value)
    end


    # Only allow a list of trusted parameters through.
    def contact_params
      params.require(:contact).permit(:name, :email, :status, :tricky_field, :user_id, :funnel_id, :step_id)
    end
end
