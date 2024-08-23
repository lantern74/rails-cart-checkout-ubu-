class StartController < ApplicationController
  def index
    # We need this for Instagram
    # client_id = '787775246232903'
    # client_secret = '15e9ce43adb018637248190811ff07ee'

    @client_id = Rails.application.credentials.dig(:instagram, :client_app_id)
    @client_secret = Rails.application.credentials.dig(:instagram, :client_secret)

    redirect_uri = instagram_redirect_uri
    # scope = 'instagram_basic,instagram_manage_comments,instagram_manage_insights'
    scope = 'user_profile,user_media'

    @instagram_login_url = "https://api.instagram.com/oauth/authorize?client_id=#{@client_id}&redirect_uri=#{redirect_uri}&scope=#{scope}&response_type=code"

    # @instagram_login_url = "https://www.facebook.com/dialog/oauth?client_id=#{@client_id}&display=page&redirect_uri=#{redirect_uri}&response_type=token&scope=#{scope}"



  end

  private
  def instagram_redirect_uri
        request.protocol + request.host_with_port + '/insta_integration/handle_instagram_token'

  end
end
