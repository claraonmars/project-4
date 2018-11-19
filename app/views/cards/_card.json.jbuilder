json.extract! card, :name, :card_number, :expiry, :cv, :account_id
json.url card_url(card, format: :json)
