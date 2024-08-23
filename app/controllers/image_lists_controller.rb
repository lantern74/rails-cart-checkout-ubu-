
class ImageListsController < ApplicationController
  before_action :authenticate_user! # This ensures the user is authenticated before accessing these actions
  skip_before_action :verify_authenticity_token


  def update
    # current_user.image_lists.destroy_all # Remove existing image lists
    params[:imageList].each do |image|
        image_params = { url: image['url'], imgid: image['id'] }
      current_user.image_lists.create(image_params)
    end
    head :no_content
  end

  def index
    @image_lists = current_user.image_lists
    render json: @image_lists
  end

  def destroy # destroy specific image
    @image_list = current_user.image_lists.find(params[:id])
    @image_list.destroy
    head :no_content
  end

  def add_image
    image_params = params.require(:image).permit(:url, :imgid)
    @image_list = current_user.image_lists.create(image_params)
    render json: @image_list
  end

  def get_aws_creds
    accessKeyId = Rails.application.credentials.aws[:access_key_id]
    secretAccessKey = Rails.application.credentials.aws[:secret_access_key]
    render json: { accessKeyId: accessKeyId, secretAccessKey: secretAccessKey }
  end


  private



end
