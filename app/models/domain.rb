# app/models/domain.rb
class Domain < ApplicationRecord
  belongs_to :user

   has_many :funnel_domains
   has_many :funnels, through: :funnel_domains
  #  has_and_belongs_to_many :funnels

  validates :name, presence: true, uniqueness: { scope: :user_id }

  # Call rebuild_routes method every time a domain
  # is verified or unverified
  def rebuild_routes
    ActionController::Routing::Routes.reload!
  end

  # I'm using OpenStruct here to highlight
  # what kind of object you should build

  # add this in hosts and run the rails s - it will work aaa.com
# 127.0.0.1 aaa.com
# 127.0.0.1 bbb.com
# 127.0.0.1 ccc.com

  def self.verified_domains
    [
      OpenStruct.new(host: 'aaa.com', path: 'aa', page_id: 'aWc9PS0tTEl1NDl4RnIzRUVxNnBaSy0tMlpHMUhMQXdKclRMb2h5NUtqSHBlZz09'),
      OpenStruct.new(host: 'bbb.com', path: 'bb', page_id: 'bHc9PS0tcm8xcUlwMWtBd2x4MDdJai0tUE5OaDdLZEg1NVVDTmdyMC9WblNIQT09'),
      OpenStruct.new(host: 'ccc.com', path: 'cc', page_id: 'RkE9PS0tMS92SzZvc09QVDJPTWZuNy0tSW1jSmdVZTVFcG9kazRSd2VvWm51dz09')
    ]
  end




end
