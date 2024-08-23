# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_04_18_070843) do
  create_table "active_storage_attachments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", precision: nil, null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "beta_updates", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contacts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "status"
    t.bigint "user_id"
    t.bigint "funnel_id"
    t.bigint "step_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["funnel_id"], name: "index_contacts_on_funnel_id"
    t.index ["step_id"], name: "index_contacts_on_step_id"
    t.index ["user_id"], name: "index_contacts_on_user_id"
  end

  create_table "customer_transactions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "product_id"
    t.string "name"
    t.string "email"
    t.decimal "price", precision: 10, scale: 2, default: "0.0"
    t.string "stripe_payment_id"
    t.string "status"
    t.integer "custompay_userid"
    t.bigint "user_id"
    t.bigint "funnel_id"
    t.bigint "step_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["funnel_id"], name: "index_customer_transactions_on_funnel_id"
    t.index ["product_id"], name: "index_customer_transactions_on_product_id"
    t.index ["step_id"], name: "index_customer_transactions_on_step_id"
    t.index ["user_id"], name: "index_customer_transactions_on_user_id"
  end

  create_table "domains", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.boolean "verified"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "user_id"], name: "index_domains_on_name_and_user_id", unique: true
    t.index ["user_id"], name: "index_domains_on_user_id"
  end

  create_table "funnel_domains", id: false, charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "funnel_id", null: false
    t.bigint "domain_id", null: false
    t.index ["domain_id", "funnel_id"], name: "index_funnel_domains_on_domain_id_and_funnel_id", unique: true
    t.index ["funnel_id", "domain_id"], name: "index_funnel_domains_on_funnel_id_and_domain_id"
  end

  create_table "funnels", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.string "path"
    t.string "head_tracking"
    t.string "body_tracking"
    t.string "payment_mode"
    t.string "domain"
    t.string "gdpr"
    t.string "image_optimization"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_funnels_on_user_id"
  end

  create_table "image_lists", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "imgid"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_image_lists_on_user_id"
  end

  create_table "memberships", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "rebilly_subscription_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "rebilly_plan_id"
    t.index ["rebilly_plan_id"], name: "fk_rails_b250175e6c"
    t.index ["user_id"], name: "index_memberships_on_user_id"
  end

  create_table "products", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "title"
    t.text "description"
    t.integer "type"
    t.boolean "live"
    t.text "from_url"
    t.text "url"
    t.decimal "price", precision: 10, scale: 2, default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "stripe_image_url"
    t.string "price_type"
    t.string "billing_period"
    t.integer "trial_period"
    t.integer "number_of_payments"
    t.decimal "setup_fee", precision: 10
    t.string "price_id"
    t.string "live_product_id"
    t.string "test_product_id"
    t.index ["user_id"], name: "index_products_on_user_id"
  end

  create_table "products_steps", id: false, charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "step_id", null: false
    t.bigint "product_id", null: false
    t.index ["product_id", "step_id"], name: "index_products_steps_on_product_id_and_step_id"
    t.index ["step_id", "product_id"], name: "index_products_steps_on_step_id_and_product_id"
  end

  create_table "rebilly_plans", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "rebilly_plan_id"
    t.string "plan_name"
    t.text "plan_description"
    t.integer "price"
    t.integer "trial_days"
    t.text "notes_for_admin"
    t.string "billing_cycle"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["rebilly_plan_id"], name: "index_rebilly_plans_on_rebilly_plan_id", unique: true
  end

  create_table "scheduled_worktasks", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "contact_id", null: false
    t.bigint "worktask_id", null: false
    t.datetime "trigger_at", precision: nil
    t.datetime "completed_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email_delivery_error"
    t.index ["contact_id"], name: "index_scheduled_worktasks_on_contact_id"
    t.index ["worktask_id"], name: "index_scheduled_worktasks_on_worktask_id"
  end

  create_table "step_types", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "kind"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "steps", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.string "thumb"
    t.string "step_path"
    t.text "description"
    t.text "seo_metadata"
    t.string "tracking_code"
    t.text "custom_css"
    t.string "background"
    t.text "typography"
    t.text "popup_html"
    t.integer "step_type_id"
    t.text "large_html_blob"
    t.integer "order"
    t.bigint "funnel_id"
    t.bigint "workflow_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["funnel_id"], name: "index_steps_on_funnel_id"
    t.index ["workflow_id"], name: "index_steps_on_workflow_id"
  end

  create_table "subscriptions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "contact_id"
    t.bigint "workflow_id"
    t.index ["contact_id"], name: "index_subscriptions_on_contact_id"
    t.index ["workflow_id"], name: "index_subscriptions_on_workflow_id"
  end

  create_table "user_beta_updates", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "beta_update_id"
    t.boolean "enabled"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["beta_update_id"], name: "fk_rails_cd61366223"
    t.index ["user_id", "beta_update_id"], name: "index_user_beta_updates_on_user_id_and_beta_update_id", unique: true
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at", precision: nil
    t.datetime "remember_created_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "pk_test"
    t.string "sk_test"
    t.string "pk_live"
    t.string "sk_live"
    t.string "first_name"
    t.string "last_name"
    t.string "phone"
    t.string "address"
    t.string "apartment"
    t.string "city"
    t.string "postalCode"
    t.string "region"
    t.string "country"
    t.string "promo_code"
    t.string "website"
    t.boolean "deactivated"
    t.string "stripe_account_id"
    t.string "stripe_access_token"
    t.string "stripe_refresh_token"
    t.string "confirmation_token"
    t.datetime "confirmed_at", precision: nil
    t.datetime "confirmation_sent_at", precision: nil
    t.string "unconfirmed_email"
    t.datetime "current_sign_in_at", precision: nil
    t.datetime "last_sign_in_at", precision: nil
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.integer "sign_in_count"
    t.string "company_name"
    t.string "instagram_token"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "workflows", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "kind"
    t.string "status"
    t.integer "total_enrolled"
    t.integer "active_enrolled"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_workflows_on_user_id"
  end

  create_table "worktask_types", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "kind"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "worktasks", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "from_name"
    t.string "from_email"
    t.string "subject_line"
    t.text "templates"
    t.text "message"
    t.string "search_term"
    t.string "fb_post_id"
    t.integer "worktask_type_id"
    t.integer "order"
    t.bigint "workflow_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "delay"
    t.integer "unit_of_time"
    t.index ["workflow_id"], name: "index_worktasks_on_workflow_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "contacts", "funnels"
  add_foreign_key "contacts", "steps"
  add_foreign_key "contacts", "users"
  add_foreign_key "customer_transactions", "funnels"
  add_foreign_key "customer_transactions", "steps"
  add_foreign_key "customer_transactions", "users"
  add_foreign_key "domains", "users"
  add_foreign_key "funnels", "users"
  add_foreign_key "image_lists", "users"
  add_foreign_key "memberships", "rebilly_plans", primary_key: "rebilly_plan_id"
  add_foreign_key "memberships", "users"
  add_foreign_key "scheduled_worktasks", "contacts"
  add_foreign_key "scheduled_worktasks", "worktasks"
  add_foreign_key "steps", "funnels"
  add_foreign_key "steps", "workflows"
  add_foreign_key "subscriptions", "contacts"
  add_foreign_key "subscriptions", "workflows"
  add_foreign_key "user_beta_updates", "beta_updates", on_delete: :cascade
  add_foreign_key "user_beta_updates", "users", on_delete: :cascade
  add_foreign_key "workflows", "users"
  add_foreign_key "worktasks", "workflows"
end
