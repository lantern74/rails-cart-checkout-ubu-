# app/controllers/users/sessions_controller.rb
class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end


  # POST /resource/sign_in

  # def create
  # #   super
  #     resource = User.find_for_database_authentication(email: params[:user][:email])
  #    if resource.nil?
  #       #something
  #    elsif resource.valid_password?(params[:user][:password])
  #     sign_in :user, resource
  #     #return render body: nil
  #     products_path # your path
  #   end
  # end



  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  protected


  def after_sign_in_path_for(resource)
    funnels_path
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
