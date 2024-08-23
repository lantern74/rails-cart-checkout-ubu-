class Worktask < ApplicationRecord
  belongs_to :workflow
  has_many :worktask_types
  has_many :scheduled_worktasks, dependent: :destroy

  enum unit_of_time: { minutes: 0, hours: 1, days: 2 }
end
