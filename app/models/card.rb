class Card < ApplicationRecord
    belongs_to :account, optional: true
end
