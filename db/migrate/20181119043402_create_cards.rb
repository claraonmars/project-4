class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :name
      t.integer :card_number
      t.string :expiry
      t.integer :cv
    end
  end
end
