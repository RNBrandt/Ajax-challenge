class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :title
      t.string :description
      t.date :due
      t.boolean :complete, :default => false


      t.timestamps
    end
  end
end
