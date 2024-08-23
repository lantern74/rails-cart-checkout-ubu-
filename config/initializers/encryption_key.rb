
# config/initializers/encryption_key.rb
require 'digest/sha2'

original_key = 'encryption key gene'
binary_key = Digest::SHA256.digest(original_key)

Rails.application.config.encryption_key = binary_key
