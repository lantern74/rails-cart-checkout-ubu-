class Contact < ApplicationRecord
  belongs_to :user
  belongs_to :funnel
  belongs_to :step
  has_many :scheduled_worktasks
end
