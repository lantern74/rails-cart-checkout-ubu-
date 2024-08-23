# app/helpers/encryption_helper.rb

module EncryptionHelper
  def encrypt_for_hidden_field(value)
    crypt = ActiveSupport::MessageEncryptor.new(Rails.application.config.encryption_key)
    encrypted_value = crypt.encrypt_and_sign(value)
    encoded_value = Base64.urlsafe_encode64(encrypted_value)
    return encoded_value
  end

  def decrypt_for_hidden_field(encrypted_value)
    decoded_value = Base64.urlsafe_decode64(encrypted_value)
    crypt = ActiveSupport::MessageEncryptor.new(Rails.application.config.encryption_key)
    decrypted_value = crypt.decrypt_and_verify(decoded_value)
    return decrypted_value
  end
end
