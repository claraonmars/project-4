class Account < ApplicationRecord
    belongs_to :user, optional: true
end
