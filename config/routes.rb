# Add this class at the top of your routes.rb file or in a separate initializer for cleanliness
class DomainConstraint
  def self.matches?(request)
      request.domain.present? && ["localhost", "uc.com"].include?(request.domain)
  end
end


Rails.application.routes.draw do
  # get 'pricing/index'
  get 'pricing', to: 'pricing#index'




  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check


  get 'home/index'


  resources :customers
  resources :contacts
  resources :customer_transactions
  # resource :beta_updates, only: [:edit, :update]
    # resources :beta_updates

    resources :beta_updates do
      resource :user_beta_update, only: [:edit, :update]
    end



resources :funnels do
  put "update_step_order", on: :member #this is for drag-n-drop sortables
  resources :steps do
    member do
      get 'details'  # Add this line for JS to read the step details in funnels#show -- AJAX call details action
      patch 'update_products_only'
    end
  end
end

# ! it has to be two times or it won't work /\    \/

resources :funnels do
  put "update_step_order", on: :member # This is for drag-n-drop sortables
  resources :domains_funnels, only: [:connect]

  resources :steps, param: :encrypted_funnel_id do
    member do
      get 'details'  # Add this line for JS to read the step details in funnels#show -- AJAX call details action
      patch 'update_products_only'
      patch 'update'
    end
  end
end


  resources :domains do
    member do
      get 'verify'
    end
  end

  resources :domains_funnels do
    post 'connect', on: :collection
  end


  resources :image_lists, only: [:destroy, :add_image, :update, :index, :get_aws_creds] do
    collection do
      get 'get_aws_creds'
      post 'add_image'
    end
  end



  resources :steps do
    member do
      get 'edit'  # Place the more specific route first
      get 'version/:version', to: 'steps#show_version', as: 'version'
      patch 'update_settings_only'
    end
    delete 'remove_large_html_blob', on: :member
  end



  resources :products do
    collection do
      get 'import'
      post 'create_from_import'
    end
  end


  resources :products_steps do
    post 'connect', on: :collection
  end

  resources :workflows do
    #it used to work with #show, now I'm transitioning to #show v2, that's how you can access the old code below is:
    member do
      get 'show_v1', to: 'workflows#show_v1'
    end

    resources :worktasks
    put "update_worktask_order", on: :member #this is for drag-n-drop sortables
  end
  resources :worktask_types


  resources :success #used for invoices only as a thank you page for custom forms

  resources :payment_intents
  resources :webhooks, only: [:create]
  resources :payment


  #root :to => "payment#show", :id => '1'

  get "funnel/index"

  get 'payment/index'
  get 'payment/new'
  post 'payment/new' => 'payment#new'

  #this doesn't exist anymore
  # get 'customer/index'
  # get 'customer/new'
  # post 'customer/new' => 'customer#new'

  post 'process_form/dynamic_form', to: 'process_form#dynamic_form', as: :dynamic_form




  get '/success/:id', to: 'success#show' #used for invoices only as a thank you page for custom forms

      devise_for :users, controllers: {
        registrations: 'users/registrations',
        sessions: 'users/sessions'
      }

# Add a route for the password setup
get '/password_setup/:token', to: 'password_setup#new', as: 'password_setup'
post '/password_setup/:token', to: 'password_setup#create'



  as :user do
    get 'users/:section', to: 'devise/registrations#edit', as: :user_section, constraints: { section: /.*/ }

    get 'users', :to => 'devise/registrations#edit'
    get 'login', to: 'devise/sessions#new'
    get 'logout', to: 'devise/sessions#destroy'
    get 'register', to: 'devise/registrations#new'
    get 'signup', to: 'devise/registrations#new'
  end

  get 'terms', to: 'products#terms'
  get 'privacy',

  to: 'products#privacy'

  # # Domains:

Domain.verified_domains.each do |domain|
  constraints host: "#{domain.host}" do
    get "/#{domain.path}", :to => "steps#show", id: domain.page_id, as: nil
    root :to => redirect("/#{domain.path}"), as: nil
  end
end

# Place this at the very bottom of your routes file to act as a catch-all
 constraints(DomainConstraint) do
    root to: 'funnels#index', as: :local_or_uc_root
  end

# At the bottom of your routes.rb, before the default root route
get '*step_path', to: 'steps#resolve_step', constraints: lambda { |request|
  !DomainConstraint.matches?(request)
}

  # Define a route for any other domain
  root to: 'funnels#resolve_domain'


  # root to: 'home#index'



end
