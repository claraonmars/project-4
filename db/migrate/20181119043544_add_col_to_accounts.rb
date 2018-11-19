class AddColToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :bank, :string
    add_column :accounts, :account_number, :integer
  end
end
