# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_20_060312) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.integer "date"
    t.string "name"
    t.bigint "user_id"
    t.string "bank"
    t.integer "account_number"
    t.index ["user_id"], name: "index_accounts_on_user_id"
  end

  create_table "cards", force: :cascade do |t|
    t.string "name"
    t.integer "card_number"
    t.string "expiry"
    t.integer "cv"
    t.integer "user_id"
  end

  create_table "currents", force: :cascade do |t|
    t.decimal "amount", precision: 10, scale: 2
    t.decimal "balance", precision: 10, scale: 2
    t.string "sort"
    t.string "operation"
    t.integer "date"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "merchant_id"
    t.index ["account_id"], name: "index_currents_on_account_id"
  end

  create_table "investments", force: :cascade do |t|
    t.boolean "rounding", default: false
    t.boolean "recurring", default: false
    t.integer "recurring_amount"
    t.integer "oneoff", default: 0
    t.bigint "account_id"
    t.index ["account_id"], name: "index_investments_on_account_id"
  end

  create_table "merchants", force: :cascade do |t|
    t.integer "reference"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "savings", force: :cascade do |t|
    t.decimal "amount", precision: 10, scale: 2
    t.decimal "balance", precision: 10, scale: 2
    t.string "sort"
    t.string "operation"
    t.integer "date"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_savings_on_account_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "current_account"
    t.integer "debit_card"
    t.integer "saving_account"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "accounts", "users"
end
