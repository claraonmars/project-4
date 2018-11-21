class Current < ApplicationRecord
    belongs_to :account, optional: true
end
