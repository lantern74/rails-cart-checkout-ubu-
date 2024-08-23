class PasswordSetupController < ApplicationController
  def new
  @token=params[:token]
    respond_to do |format|
      format.html # Render the HTML template (new.html.erb)
      format.json { render json: { message: 'Password setup JSON response' } }
    end
  end
  def create
    user = User.find_by_confirmation_token(params[:user][:token])
    if user.present?
      user.update(password: params[:user][:password], password_confirmation: params[:user][:password_confirmation])
      user.confirm
      sign_in(user)
      redirect_to funnels_path, notice: "Password successfully set. You are now signed in."
    else
      redirect_to root_path, alert: "Invalid token. Please try again or request a new confirmation email."
    end
  end
  protected
end
