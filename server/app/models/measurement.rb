# frozen_string_literal: true

# The logs of a given metric
class Measurement < ApplicationRecord
  validates :timestamp, presence: true
  validates :value, presence: true, numericality: true
  belongs_to :metric, foreign_key: 'owner_id', inverse_of: false
end
