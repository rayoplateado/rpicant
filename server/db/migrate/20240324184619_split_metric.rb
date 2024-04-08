# frozen_string_literal: true

# Splits the Metrics model in two models, one for Metric and other for the Observation
class SplitMetric < ActiveRecord::Migration[7.1]
  def change
    create_observations_table
    change_metrics_table
  end

  private

  def create_observations_table
    create_table :observations do |t|
      t.integer :owner_id, null: false
      t.datetime :timestamp, null: false
      t.decimal :value, null: false, precision: 10, scale: 2
      t.timestamps
    end
    add_foreign_key :observations, :metrics, column: :owner_id
    add_index :observations, :owner_id
  end

  def change_metrics_table
    change_table :metrics, bulk: true do |t|
      t.remove :value, type: :integer
      t.remove :timestamp, type: :datetime
    end
  end
end
