class Funnel < ApplicationRecord
      has_many :steps, join_table: 'funnels_steps'
      has_many :funnels_steps, dependent: :destroy
      belongs_to :user


      has_many :funnel_domains
      has_many :domains, through: :funnel_domains
        # has_and_belongs_to_many :domains

end
