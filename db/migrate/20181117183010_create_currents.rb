class CreateCurrents < ActiveRecord::Migration[5.2]
  def change
    create_table :currents do |t|
      t.decimal :amount, {precision: 10, scale: 2}
      t.decimal :balance, {precision: 10, scale: 2}
      t.string :sort
      t.string :operation
      t.integer :date

      t.timestamps
    end
  end
end
