class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable

    after_create :create_demo_funnels_for_user

         # Remove attr_accessor for skip_password
    attr_accessor :skip_password

    before_validation :skip_password_validation_if_needed


    has_many :products, dependent: :destroy
    has_many :funnels, dependent: :destroy
    has_many :workflows, dependent: :destroy
    has_many :contacts, dependent: :destroy
    has_many :customer_transactions, dependent: :destroy
    has_one :membership

    has_many :user_beta_updates
    has_many :beta_updates, through: :user_beta_updates

    has_many :domains, dependent: :destroy

    has_many :image_lists

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable


  def deactivate
    update(deactivated: true)
  end

  def activate
    update(deactivated: false)
  end



   #note: below is done so I can save info in devise profile edit form without putting the password everytime.
  def update_with_password(params, *options)
      current_password = params.delete(:current_password)

      if params[:password].blank?
        params.delete(:password)
        params.delete(:password_confirmation) if params[:password_confirmation].blank?
      end

      result = if params[:password].blank? || valid_password?(current_password)
        update(params, *options)
      else
        self.assign_attributes(params, *options)
        self.valid?
        self.errors.add(:current_password, current_password.blank? ? :blank : :invalid)
        false
      end

      clean_up_passwords
      result
  end

  private

  def create_demo_funnels_for_user
    demo_funnel_titles = [
      "1. Start Here: The Magic Sales Funnel for Product X <-our best performer over all",
      "Marketing Funnel for E-commerce Store",
      "Lead Generation Funnel for Service Y",
      "Conversion Funnel for Mobile App"
    ]

        workflow_data = [
        {
          name: "Fast Money - Weird Holiday Promo With Deadline",
          total_enrolled: 0,
          active_enrolled: 0
        },
        {
          name: "Black Friday - Promo With Deadline",
          total_enrolled: 0,
          active_enrolled: 0
        }
      ]

      workflow_data.each do |workflow_attributes|
        self.workflows.create!(workflow_attributes)
      end


      demo_funnel_titles.each do |title|


      funnel = self.funnels.create!(title: title)



      # Define steps without specifying HTML file names here
      steps_data = [
        { title: "Opt In", step_type_id: 1, order: 0, workflow_id: 1 },
        { title: "Sales Page - Discount", step_type_id: 1, order: 1, workflow_id: 1 },
        { title: "Upsell 1", step_type_id: 1, order: 2, workflow_id: 1 },
        { title: "Order Confirmation", step_type_id: 1, order: 3, workflow_id: 1 },
        { title: "Weekend Deadline Page", step_type_id: 1, order: 4, workflow_id: 1 },
        { title: "Sales Page - Full Price", step_type_id: 1, order: 5, workflow_id: 1 },
        # Add any additional steps
      ]

    steps_data.each_with_index do |step_data, index|
      step = funnel.steps.create!(step_data)

        # Attach HTML files to each step based on the step's ID
        attach_html_files_to_step(step, index + 1) # index + 1 to start file naming from 1
      end
    end
  end


  def attach_html_files_to_step(step, index)
    # Construct file names using index
    html_file_name = "html_step#{index}.html"
    popup_html_file_name = "popup_step#{index}.html"

    # Attach the main HTML content
    html_file_path = Rails.root.join('db', html_file_name)
    if File.exist?(html_file_path)
      step.large_html_blob.attach(io: File.open(html_file_path), filename: html_file_name, content_type: 'text/html')
    end

    # Attach the popup HTML content
    popup_html_file_path = Rails.root.join('db', popup_html_file_name)
    if File.exist?(popup_html_file_path)
      step.popup_html_blob.attach(io: File.open(popup_html_file_path), filename: popup_html_file_name, content_type: 'text/html')
    end
  end


  def skip_password_validation_if_needed
    self.password_confirmation = self.password = nil if skip_password
  end


end
