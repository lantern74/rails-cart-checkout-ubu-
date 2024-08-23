class UserBetaUpdatesController < ApplicationController

  before_action :authenticate_user!  # Ensure the user is signed in
  before_action :set_beta_update

def update
  @beta_update = BetaUpdate.find(params[:beta_update_id])
  @user_beta_update = @beta_update.user_beta_updates.find_by(user: current_user)


    if @user_beta_update.nil?
      # If no association exists, create a new one
      @user_beta_update = @beta_update.user_beta_updates.create(user: current_user)
      @user_beta_update.update(enabled: true)
    else
      # Update the existing association
      @user_beta_update.update(user_beta_update_params)
    end


  respond_to do |format|
    format.js # This will look for update.js.erb in your views
  end
end



  private
  def set_beta_update
    @beta_update = BetaUpdate.find(params[:beta_update_id])
  end

  def user_beta_update_params
    params.require(:user_beta_update).permit(:enabled)
  end
end
