class Account < ApplicationRecord
    belongs_to :user, optional: true
    has_many :currents
    has_many :savings
end
