# app/models/subscription.rb
class Subscription < ApplicationRecord
  belongs_to :contact
  belongs_to :workflow
end
