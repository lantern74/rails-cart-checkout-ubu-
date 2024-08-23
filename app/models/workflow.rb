class Workflow < ApplicationRecord
  has_many :worktasks
  has_many :steps
end
