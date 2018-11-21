class Saving < ApplicationRecord
      belongs_to :account, optional: true
end
