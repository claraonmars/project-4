class AddColToCards < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :account_id, :integer
  end
end
