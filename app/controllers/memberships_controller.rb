# app/controllers/memberships_controller.rb
class MembershipsController < ApplicationController

  before_action :authenticate_user!

  def create
    customer = Stripe::Customer.create(
      email: current_user.email,
      source: params[:stripeToken]
    )

    subscription = Stripe::Subscription.create(
      customer: customer.id,
      items: [{ price: 'price_1OFxNhFQfF05j2AWEkOPdO6T' }],
      trial_period_days: 30
    )

    current_user.membership.update(stripe_subscription_id: subscription.id)

    redirect_to root_path, notice: 'Successfully subscribed!'
  end
end
