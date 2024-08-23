class Step < ApplicationRecord
  belongs_to :funnel
  has_many :workflows
  has_many :step_types
  # has_one_attached :large_html_blob
  # has_one_attached :popup_html_blob

  has_one_attached :large_html_blob
  has_one_attached :large_html_blob_1
  has_one_attached :large_html_blob_2
  has_one_attached :large_html_blob_3

  has_one_attached :popup_html_blob
  has_one_attached :popup_html_blob_1
  has_one_attached :popup_html_blob_2
  has_one_attached :popup_html_blob_3

  has_and_belongs_to_many :products


      # mount_uploader :large_html_blob, LargeHtmlBlobUploader

  attr_accessor :large_html_blob_content
  attr_accessor :popup_html_blob_content



end
