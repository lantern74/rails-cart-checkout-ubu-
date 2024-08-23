class Product < ApplicationRecord
   belongs_to :user
   has_and_belongs_to_many :steps

   has_one_attached :product_image, :dependent => :destroy
end
