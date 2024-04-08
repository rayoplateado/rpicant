# frozen_string_literal: true

# A metric that is going to receive logs
class Metric < ApplicationRecord
  validates :name, presence: true, length: { minimum: 3, maximum: 40 }
  has_many :measurements, dependent: :destroy, foreign_key: 'owner_id', inverse_of: false
end
