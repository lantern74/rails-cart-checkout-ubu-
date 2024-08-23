class BetaUpdate < ApplicationRecord
  has_many :user_beta_updates
  has_many :users, through: :user_beta_updates

end
