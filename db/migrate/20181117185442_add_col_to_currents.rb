class AddColToCurrents < ActiveRecord::Migration[5.2]
  def change
    add_column :currents, :merchant_id, :integer
  end
end
