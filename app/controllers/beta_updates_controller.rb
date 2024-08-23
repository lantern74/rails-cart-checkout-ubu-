# app/controllers/beta_updates_controller.rb
class BetaUpdatesController < ApplicationController
  before_action :authenticate_user!

   def index
    @beta_updates = BetaUpdate.all
  end

  # def edit
  #   @beta_updates = current_user.beta_updates
  # end

def edit
  @beta_update = BetaUpdate.find(params[:id])
end


  def create
    if current_user && current_user.id == 1
      @beta_update = BetaUpdate.new(beta_update_params)

      if @beta_update.save
        redirect_to beta_updates_path, notice: 'Beta update was successfully created.'
      else
        render :new
      end
    else
      flash[:alert] = "You are not authorized to perform this action."
      redirect_to root_path
    end
  end



def update
 if current_user && current_user.id == 1
    @beta_update = BetaUpdate.find(params[:id])
    if @beta_update.update(beta_update_params)
      redirect_to beta_updates_path, notice: 'Preferences updated successfully.'
    else
      render :edit
    end
  else
      flash[:alert] = "You are not authorized to perform this action."
      redirect_to root_path
  end
end

  private

  def beta_update_params
    params.require(:beta_update).permit(:name, :description, :user_id)
  end
end
