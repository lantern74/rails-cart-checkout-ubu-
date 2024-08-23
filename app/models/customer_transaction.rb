class CustomerTransaction < ApplicationRecord
   belongs_to :user
   belongs_to :product, optional: true
   validates :name, presence: true
   validates :email, presence: true

end
