class AddColToCurrentAndSaving < ActiveRecord::Migration[5.2]
  def change
    add_column :currents, :account_id, :integer
    add_column :savings, :account_id, :integer
  end
end
