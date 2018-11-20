class CreateInvestment < ActiveRecord::Migration[5.2]
  def change
    create_table :investments do |t|
      t.boolean :rounding, default: false
      t.boolean :recurring, default: false
      t.integer :recurring_amount, {precision: 10, scale: 2}, default: 0
      t.integer :oneoff, default: 0

      t.references :account
    end
  end
end
