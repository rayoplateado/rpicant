# frozen_string_literal: true

# Creates the Metrics Table
class CreateMetrics < ActiveRecord::Migration[7.1]
  def change
    create_table :metrics do |t|
      t.string :name, limit: 40
      t.datetime :timestamp
      t.integer :value

      t.timestamps
    end
  end
end
