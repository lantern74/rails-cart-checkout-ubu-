# app/models/user_beta_update.rb
class UserBetaUpdate < ApplicationRecord
  belongs_to :user
  belongs_to :beta_update
end
