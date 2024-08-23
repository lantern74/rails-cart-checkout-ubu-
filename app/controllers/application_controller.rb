class ApplicationController < ActionController::Base

  helper :all # ensures all helpers are loaded
  before_action :set_beta_updates


 private



  def set_beta_updates
    @updates = BetaUpdate.order(created_at: :desc).limit(50)
    @update_names = @updates.pluck(:id, :name)
  end

end
