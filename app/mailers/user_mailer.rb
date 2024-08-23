class UserMailer < ApplicationMailer
  default from: 'support@geneadam.com'

  def worktask_email(contact, worktask)
    @worktask = worktask

    mail(
      to: contact.email, 
      from: email_address_with_name(@worktask.from_email, @worktask.from_name), 
      subject: worktask.subject_line
    )
  end

  def welcome_email(customer_transaction, user, product, this_is_a_product, ty_url)
    @customer_transaction = customer_transaction
    @user = user
    @product = product
    @this_is_a_product = this_is_a_product
    @thankyou_url=ty_url

    @url  = 'http://geneadam.com'
    mail(to: @customer_transaction.email, subject: 'Receipt from Gene Adam')
  end
end
