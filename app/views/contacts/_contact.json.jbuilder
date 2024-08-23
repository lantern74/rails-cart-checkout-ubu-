json.extract! contact, :id, :name, :email, :status, :user_id, :funnel_id, :step_id, :created_at, :updated_at
json.url contact_url(contact, format: :json)
