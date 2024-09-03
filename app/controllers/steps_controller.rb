require 'nokogiri'

class StepsController < ApplicationController
 include EncryptionHelper
  # before_action :load_funnel # we need this to look up funnel id
  # before_action :load_step, only: [:show, :edit, :update, :destroy]  # we need this to make funnel stuff work
 # before_action :set_turbolinks_cache_control, only: [:edit]

   before_action :resolve_funnel_from_domain

def clean_up_html(html_content)
  # Use Nokogiri to parse and clean the HTML content
  # Remove elements with class containing "de-rollover"
  # Serialize the Nokogiri document back to an HTML string

  doc = Nokogiri::HTML(html_content)
  doc.search('.//*[contains(@class, "de-rollover")]').remove


  # Remove <div style="position: relative;"></div> elements
  doc.search('div[@style="position: relative;"]').each do |div|
    div.remove if div.children.blank? # Ensures to remove only empty divs with the specific style
  end


    # Remove specific border styles
  doc.search('*[@style]').each do |node|
    if node['style'].include?('border: 3px solid rgb(55, 202, 55);') ||
       node['style'].include?('border: 3px solid orange;') ||
       node['style'].include?('border: 3px solid rgb(58, 133, 255);')
      node['style'] = node['style'].gsub('border: 3px solid rgb(55, 202, 55);', '')
                                  .gsub('border: 3px solid orange;', '')
                                  .gsub('border: 3px solid rgb(58, 133, 255);', '')
    end
  end


  # Set the class to "" for divs with ID starting with "formBody-"
  doc.search('div[id^="formBody-"]').each do |div|
    div['class'] = ""
  end

  # Set the class to "hidden" for divs with ID starting with "formBody2-"
  doc.search('div[id^="formBody2-"]').each do |div|
    div['class'] = "hidden"
  end



  the_html = doc.to_html
  # the_html = html_content

  # Remove extra white space (including newlines)
  cleaned_html = the_html.gsub(/\s+/, ' ').strip
  # Specifically replace '> <' with '><'
  cleaned_html.gsub!(/\>\s+</, '><')


  # Replace all links with https:// if it's not there
  regex = /<a href="((?!#open-popup|#submit-form|#").*?)">/
  modified_html_content = cleaned_html.gsub(regex) do |match|
    href = $1
    # Check if href does not contain 'http://' or 'https://'
    unless href.match(%r{^(http|https)://})
      # Add 'https://' to the href attribute and replace " with '
      "<a data-turbo='false'  href='https://#{href.gsub('"', "'")}'>"
    else
      match
    end
  end

  modified_html_content
end


#this is for the domains resolve to /step1 /step2 etc
  def resolve_step
    if @funnel.present?
      step_path = "/#{params[:step_path]}"
      step = @funnel.steps.find_by(step_path: step_path)
        if step
          load_blobs(step.id)
          # @step is loaded in the load_blobs, so the statement below is correct
          render 'show', locals: { step: @step }
        else
          redirect_to "https://upsellcart.com", allow_other_host: true, alert: 'Step not found' and return


        end
    else
      redirect_to "https://upsellcart.com", allow_other_host: true, alert: 'Funnel not found' and return


    end
  end


def details
 puts "Entering details#show action"

  @funnel = Funnel.find(params[:funnel_id])

  begin
    @step = @funnel.steps.find(params[:id])
    @products = @step&.products || []


  rescue ActiveRecord::RecordNotFound
    # Handle the case where the step is not found
    @step = nil  # or any other appropriate handling
  end

  respond_to do |format|
    format.html # This will render the HTML template for the initial page load
    format.js   # This will respond to AJAX requests
  end

end

def show
# this is here:   http://localhost/funnels/1
# and the funnel step web page as well:  http://localhost/funnels/1/steps/1
 puts "Entering steps#show action" #keep these because sometimes you don't know if you are in funnels contrl. or steps contrl.

  decrypted_step_id = decrypt_for_hidden_field(params[:id])
  load_blobs(decrypted_step_id)

    respond_to do |format|
      format.html # This will render the HTML template for the initial page load
      format.js   # This will respond to AJAX requests
    end
end

def show_version
  @step = Step.find(decrypt_for_hidden_field(params[:id]))

  version_number = params[:version].to_i
  attachment_name = params[:attachment_name] || 'large_html_blob'

  case version_number
  when 1
    attachment = @step.send("#{attachment_name}")
  when 2
    attachment = @step.send("#{attachment_name}_1")
  when 3
    attachment = @step.send("#{attachment_name}_2")
  else
    render plain: "Invalid version number", status: :bad_request
    return
  end


  if attachment.attached?
    # Load the content from the attachment into the instance variable
    @step.large_html_blob_content = attachment.download

    # Ensure any other instance variables required by show.html.erb are also set here
    @funnel = @step.funnel
    @products = @step&.products || []

    respond_to do |format|
      format.html { render :show } # Reuse the show.html.erb template
      format.js # Optionally handle JS response if needed
    end
  else
    render plain: "No attachment found for version #{version_number}", status: :not_found
  end

end


def create
  funnel = Funnel.find(params[:funnel_id])
  @step = Step.new(step_params)

  highest_order = funnel.steps.maximum(:order)
  @step.order = highest_order.to_i + 1

  funnel.steps << @step

  if @step.save
    respond_to do |format|
      format.html { redirect_to funnel_path(funnel), notice: 'Step was successfully created.' }
      format.js   # Render JavaScript response (e.g., close modal or update page)
    end
  else
    # Handle validation errors if any
    respond_to do |format|
      format.html { render :new }
      format.js do
        render :error_messages, status: :unprocessable_entity
      end
    end
  end
end


def edit

begin
  decrypted_step_id = decrypt_for_hidden_field(params[:id])

  # Now you can use the decrypted value as needed
  # ...
rescue ActiveSupport::MessageVerifier::InvalidSignature, ActiveSupport::MessageEncryptor::InvalidMessage
  # Handle the exception (e.g., log it, return an error response)
  puts "Error: Invalid signature or message"
end


  if decrypted_step_id.present?
    @step = Step.find(decrypted_step_id)

    begin
      @step.large_html_blob_content = @step.large_html_blob.download if @step.large_html_blob.attached?
    rescue Errno::ENOENT
      # Handle the missing file error (e.g., log it, provide a default value, etc.)
      @step.large_html_blob_content = "Default content"
    end
        # Handle popup_html_blob
    if @step.popup_html_blob.attached?
      begin
        @step.popup_html_blob_content = @step.popup_html_blob.download
      rescue Errno::ENOENT
        # Handle the missing file error for popup_html_blob (e.g., log it, provide a default value, etc.)
        @step.popup_html_blob_content = "Default popup HTML content"
      end
    end

    @funnel = @step.funnel

  else
    # Handle the case where decryption fails or the ID is not present
    # flash[:alert] = 'Invalid Step ID'
     flash[:alert] = 'Something went wrong'  # but it's really Invalid Step ID :)

    redirect_to("https://upsellcart.com", allow_other_host: true) and return

  end

end




def remove_large_html_blob
  @step = Step.find(params[:id])
  @step.large_html_blob.purge if @step.large_html_blob.attached?
  redirect_to edit_step_path(@step), notice: "Large data blob removed"
end


def update_settings_only

  decrypted_step_id = decrypt_for_hidden_field(params[:id])
  @step = Step.find(decrypted_step_id)



  respond_to do |format|
    if @step.update(settings_params)
      format.json { render json: { success: true } }
    else
      format.json { render json: { errors: @step.errors.full_messages }, status: :unprocessable_entity }
    end
  end

end

  def update_products_only
    decrypted_step_id = decrypt_for_hidden_field(params[:id])
    @step = Step.find(decrypted_step_id)

    respond_to do |format|
      if @step.update(products_params)
        format.json { render json: { success: true } }
      else
        format.json { render json: { errors: @step.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end


def update
  decrypted_step_id = decrypt_for_hidden_field(params[:id])
  @step = Step.find(decrypted_step_id)
  @step.id = decrypted_step_id

  timestamp = Time.now.strftime('%Y%m%d%H%M%S')

  if params[:step][:large_html_blob_content].present?
    cleaned_html = clean_up_html(step_params[:large_html_blob_content])
    rotate_attachments(@step, :large_html_blob, cleaned_html, "your_filename_#{timestamp}.html")
  end

  if params[:step][:popup_html_blob_content].present?
    cleaned_html = clean_up_html(step_params[:popup_html_blob_content])
    rotate_attachments(@step, :popup_html_blob, cleaned_html, "popup_filename_#{timestamp}.html")
  end

  respond_to do |format|
    if @step.update(step_params)
      format.json { render json: { message: "Saved at " + Time.now.strftime("%I:%M:%S %p") }, status: :ok }
    else
      format.json { render json: @step.errors, status: :unprocessable_entity }
    end
  end
end

private

def rotate_attachments(step, attachment_name, cleaned_html, filename)
  # Rotate the attachments
  if step.send("#{attachment_name}_2").attached?
    step.send("#{attachment_name}_2").purge
  end

  if step.send("#{attachment_name}_1").attached?
    step.send("#{attachment_name}_2").attach(step.send("#{attachment_name}_1").blob)
    step.send("#{attachment_name}_1").detach
  end

  if step.send(attachment_name).attached?
    step.send("#{attachment_name}_1").attach(step.send(attachment_name).blob)
    step.send(attachment_name).detach
  end

  # Attach the new cleaned HTML content
  step.send(attachment_name).attach(
    io: StringIO.new(cleaned_html),
    filename: filename,
    content_type: 'text/html'
  )
end

  def load_blobs(step_id)
    begin

    @step = Step.find(step_id)
    @funnel = Funnel.find(@step.funnel_id)
    @products = @step&.products || []

    # Check if large_html_blob is attached and load its content
    @step.popup_html_blob_content = '' # Set it to an empty string

    begin
      @step.large_html_blob_content = @step.large_html_blob.download if @step.large_html_blob.attached?
    rescue Errno::ENOENT
      # Handle the missing file error (e.g., log it, provide a default value, etc.)
      @step.large_html_blob_content = "Default content"
    end


    # Handle popup_html_blob
    if @step.popup_html_blob.attached?
      begin
        @step.popup_html_blob_content = @step.popup_html_blob.download
      rescue Errno::ENOENT
        # Handle the missing file error for popup_html_blob (e.g., log it, provide a default value, etc.)
        @step.popup_html_blob_content = "Default popup HTML content"
      end
    end

    # Check if popup_html_blob is attached and load its content
    rescue ActiveRecord::RecordNotFound
      # Handle the case where the step is not found
      @step = nil  # or any other appropriate handling
    end
  end

  def resolve_funnel_from_domain
    domain_name = request.host
    domain = Domain.find_by(name: domain_name)
    if domain
      funnel = domain.funnels.first # Assuming one funnel per domain
      @funnel = funnel if funnel.present?
    end
  end



  def products_params
    params.require(:step).permit(product_ids: [])
  end

  def settings_params
    params.require(:step).permit(:workflow_id, :title, :step_path, :background)
  end


    def step_params
      params.require(:step).permit(:title, :thumb, :step_types, :step_path, :description, :seo_metadata, :tracking_code, :custom_css, :background, :typography, :popup_html,:funnel_id,:step_type_id,:large_html_blob,:large_html_blob_content,:popup_html_blob_content)
    end

end
