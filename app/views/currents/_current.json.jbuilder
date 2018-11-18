json.extract! current, :id, :amount, :balance, :sort, :operation, :created_at, :updated_at
json.url current_url(current, format: :json)
