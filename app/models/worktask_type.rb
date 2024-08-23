class WorktaskType < ApplicationRecord
  belongs_to :worktask, optional: true

  EMAIL = 1
  DELAY = 2
end
