json.extract! card, :name, :card_number, :expiry, :cv
json.url card_url(card, format: :json)
