# frozen_string_literal: true

# Renames observations table to measuments
class RenameObservationsToMeasurements < ActiveRecord::Migration[7.1]
  def change
    rename_table :observations, :measurements
  end
end
