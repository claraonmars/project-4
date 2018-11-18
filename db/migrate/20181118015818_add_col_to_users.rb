class AddColToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :current_account, :integer
    add_column :users, :debit_card, :integer
    add_column :users, :saving_account, :integer
  end
end
