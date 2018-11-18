class CreateMerchants < ActiveRecord::Migration[5.2]
  def change
    create_table :merchants do |t|
      t.integer :reference
      t.string :category

      t.timestamps
    end
  end
end
