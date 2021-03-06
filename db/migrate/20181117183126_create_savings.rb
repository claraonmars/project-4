class CreateSavings < ActiveRecord::Migration[5.2]
  def change
    create_table :savings do |t|
      t.decimal :amount, {precision: 10, scale: 2}
      t.decimal :balance, {precision: 10, scale: 2}
      t.string :sort
      t.string :operation
      t.integer :date
      t.references :account

      t.timestamps
    end
  end
end
