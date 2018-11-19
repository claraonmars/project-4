json.extract! current, :id, :amount, :balance, :sort, :operation, :date, :created_at, :updated_at, :user_id
json.url current_url(current, format: :json)
