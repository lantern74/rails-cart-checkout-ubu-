class FunnelsController < ApplicationController
 include EncryptionHelper
  before_action :authenticate_user!, except: [:resolve_domain]

  def resolve_domain
    domain_name = request.host
    domain = Domain.find_by(name: domain_name)

    if domain.present?
      funnel = domain.funnels.first # Assuming one funnel per domain for simplicity
      if funnel.nil?
        redirect_to("https://upsellcart.com", allow_other_host: true) and return
      else
        first_step = funnel.steps.order(:order).first
        # Further actions...
      end


      if first_step
        redirect_to step_path(encrypt_for_hidden_field(first_step.id)) # Assuming you have a named route for steps
      else
        # render 'no_steps_found' # Handle case where no steps are found
          redirect_to "https://upsellcart.com", allow_other_host: true, alert: 'Step not found' and return

      end
    else
      # render 'domain_not_found' # Handle case where domain is not found
         redirect_to "https://upsellcart.com", allow_other_host: true, alert: 'Domain not found' and return

    end
  end

def index
  @funnels = current_user.funnels
  @steps = Step.joins(:funnel).where(funnels: { id: @funnels.pluck(:id) })
end

def create
  @funnel = current_user.funnels.build(funnel_params)

  if @funnel.save
    redirect_to funnels_path, notice: 'Funnel was successfully created.'
  else
    render :new
  end
end

  def connect
    @step = Step.find(params[:step_id])
    @product = Product.find(params[:product_id])

    if @step && @product
      # Associate the product with the step
      @step.products << @product
      render json: { success: true }
    else
      render json: { success: false, error: 'Failed to connect product' }
    end
  end

def show
   puts "Entering funnels#show action"

  @funnel = Funnel.find(params[:id])
  @step_types = StepType.all
  @step = params[:step_id].present? ? @funnel.steps.find(params[:step_id]) :  @funnel.steps.order(:order).first
  @products = @step&.products || []
  @steps = @funnel.steps.order(:order)
  @domains = @funnel&.domains || []
end



def update_step_order  #this is for drag-n-drop sortables
  funnel = Funnel.find(params[:id])

  # Update the step order based on the received stepIds
  params[:stepIds].each_with_index do |step_id, index|
    step = funnel.steps.find(step_id)
    step.update(order: index)
  end

  # Respond with a success status
  render json: { message: "Step order updated successfully" }
end

  def edit #this is for editing pages
    @funnel = Funnel.find(params[:id])
  end


  def update
    @funnel = Funnel.find(params[:id])
    if @funnel.update(funnel_params)
      redirect_to @funnel, notice: 'Funnel was successfully updated.'
    else
      render :edit
    end
  end

  # ...

  private

  # Strong parameters to ensure only allowed attributes are updated

  def funnel_params
  params.require(:funnel).permit(:title, :path, :head_tracking, :body_tracking, :payment_mode, :domain, :gdpr, :image_optimization)
end

end

