class AddUserToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_reference :accounts, :user, foreign_key: true
    remove_column :currents, :user_id
    remove_column :savings, :user_id
  end
end
