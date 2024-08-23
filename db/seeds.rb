# db/seeds.rb
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


require 'faker'


# User seeding
User.create!(
  email: "test@test.com",
  password: "222222",
  created_at: "2021-12-13 16:37:12.104710",
  updated_at: "2021-12-13 16:37:12.104710",
  confirmed_at: "2021-12-13 16:37:12.104710"
  )



# # Define an array of real funnel titles
# real_funnel_titles = [
#   "1. Start Here: The Magic Sales Funnel for Product X <-our best performer over all",
#   "Marketing Funnel for E-commerce Store",
#   "Lead Generation Funnel for Service Y",
#   "Conversion Funnel for Mobile App",
# ]

# # Create funnels with real titles
# real_funnel_titles.each do |title|
#   Funnel.create!(
#     title: title,
#     user_id: 1
#   )
# end

puts "Funnels seeded"

# workflow_data = [
#   {
#     name: "Fast Money - Weird Holiday Promo With Deadline",
#     total_enrolled: 0,
#     active_enrolled: 0,
#     user_id: 1
#   },
#   {
#     name: "Black Friday - Promo With Deadline",
#     total_enrolled: 0,
#     active_enrolled: 0,
#     user_id: 1
#   }
# ]

# Workflow.create!(workflow_data)

puts "Workflows seeded"

# Create StepTypes
step_types_data = [
  { id:'1', name: "Optin", kind: "Optin Form" },
  { id:'2', name: "Checkout", kind: "Checkout Form" }
  # Add more records as needed
]

step_type = StepType.create!(step_types_data)

puts "StepType seeded"

# Then, create the steps using the provided data
# steps_data = [
  # {
  #   title: "Opt In",
  #   step_type_id: 1,
  #   order: 0,
  #   funnel_id: 1,
  #   workflow_id: 1,
  #   created_at: "2023-11-07 07:34:41.314885",
  #   updated_at: "2023-11-07 07:36:26.562220"
  # },
  # {
  #   title: "Sales Page - Discount",
  #   step_type_id: 1,
  #   order: 1,
  #   funnel_id: 1,
  #   workflow_id: 1,
  #   created_at: "2023-11-07 07:35:05.965927",
  #   updated_at: "2023-11-07 07:36:26.581819"
  # },
  # {
  #   title: "Upsell 1",
  #   step_type_id: 1,
  #   order: 2,
  #   funnel_id: 1,
  #   workflow_id: 1,
  #   created_at: "2023-11-07 07:36:20.091087",
  #   updated_at: "2023-11-07 07:36:26.598863"
  # },
  # {
  #   title: "Order Confirmation",
  #   step_type_id: 1,
  #   order: 3,
  #   funnel_id: 1,
  #   workflow_id: 1,
  #   created_at: "2023-11-07 07:35:31.498041",
  #   updated_at: "2023-11-07 07:36:26.613272"
  # },
  # {
  #   title: "Weekend Deadline Page",
  #   step_type_id: 1,
  #   order: 4,
  #   funnel_id: 1,
  #   workflow_id: 1,
  #   created_at: "2023-11-07 07:35:43.666324",
  #   updated_at: "2023-11-07 07:36:26.628121"
  # },
  # {
  #   title: "Sales Page - Full Price",
  #   step_type_id: 1,
  #   order: 5,
  #   funnel_id: 1,
  #   workflow_id: 1,
  #   created_at: "2023-11-07 07:35:57.315155",
  #   updated_at: "2023-11-07 07:36:26.643255"
  # }

#]


# steps_data.each do |step_data|
#   step = Step.create!(step_data)


# # Create unique file names based on step data
#   html_file_name = "html_step#{step.id}.html"
#   popup_html_file_name = "popup_step#{step.id}.html"

#   # Attach a blob to the large_html_blob field
#   html_file_path = Rails.root.join('db', html_file_name)
#   step.large_html_blob.attach(io: File.open(html_file_path), filename: html_file_name, content_type: 'text/html')

#   # Attach a blob to the popup_html_blob field
#   popup_html_file_path = Rails.root.join('db', popup_html_file_name)
#   step.popup_html_blob.attach(io: File.open(popup_html_file_path), filename: popup_html_file_name, content_type: 'text/html')


# end

puts "Step data seeded"





# Create StepTypes
worktask_types_data = [
  { id:'1', name: "Email Message", kind: "email" },
  { id:'2', name: "Instagram Message", kind: "insta_msg" },
  { id:'10', name: "Delay Task", kind: "delay" }
  # Add more records as needed
]

worktask_type = WorktaskType.create!(worktask_types_data)

puts "Worktask type data seeded"

worktasks_data = [
  {
    name: 'Weird Holiday Email 1',
    from_name: '',
    from_email: '',
    subject_line: 'This is weird, but ...',
    message: 'Hey, {{contact.first_name}},

Did you know that today is [INSERT STRANGE HOLIDAY HERE]

Seriously! That\'s an actual holiday, and it just so happens to be ... today!',
    worktask_type_id: 1,
    order:0,
    workflow_id: 1
  },
  {
    name: 'Delay',
    from_name: '',
    from_email: '',
    subject_line: '',
    message: '10 minutes',
    worktask_type_id: 10,
    order:1,
    workflow_id: 1
  },
  {
    name: 'Weird Holiday Email 2',
    from_name: '',
    from_email: '',
    subject_line: 'subj',
    message: 'test',
    worktask_type_id: 1,
    order:2,
    workflow_id: 1
  },
  {
    name: 'Delay',
    from_name: '',
    from_email: '',
    subject_line: '',
    message: '5 mins',
    worktask_type_id: 10,
    order:3,
    workflow_id: 1
  }
]

# Seed WorkTasks
worktasks_data.each do |worktask_data|
  Worktask.create!(worktask_data)
end
puts "Worktasks seeded"





beta_updates_data = [
  {
    name: "Email Broadcasts",
    description: "Send Emails Instantly to Your Lists",
    created_at: "2023-12-02 16:14:12.783741",
    updated_at: "2023-12-02 16:39:27.969615"
  },
  {
    name: "Dashboards",
    description: "All kinds of data and metrics",
    created_at: "2023-12-02 17:41:01.693862",
    updated_at: "2023-12-03 09:55:27.576158"
  },
  {
    name: "Memberships & Courses",
    description: "You can have memberships and courses as products and you can sell them.",
    created_at: "2023-12-02 17:41:01.693862",
    updated_at: "2023-12-03 10:26:44.042767"
  },
  {
    name: "Weekly Calls",
    description: nil,
    created_at: "2023-12-03 10:08:36.813385",
    updated_at: "2023-12-03 10:08:36.813385"
  },
  {
    name: "Daily Live Office Hours",
    description: nil,
    created_at: "2023-12-03 10:22:50.524862",
    updated_at: "2023-12-03 10:22:50.524862"
  },
  {
    name: "Facebook Fridays",
    description: nil,
    created_at: "2023-12-03 10:22:59.869453",
    updated_at: "2023-12-03 10:22:59.869453"
  },
  {
    name: "AI Bot 2.0",
    description: "",
    created_at: "2023-12-03 10:23:07.292290",
    updated_at: "2023-12-03 10:25:32.006993"
  }
]

BetaUpdate.create!(beta_updates_data)
puts "Beta Updates seeded"





# -end-
puts "end"

