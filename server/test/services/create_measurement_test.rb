# frozen_string_literal: true

require 'test_helper'

class CreateMeasurementTest < ActionDispatch::IntegrationTest
  test 'should resource grouped by period minute' do
    assert_difference ['Measurement.count', 'Metric.count'], 1 do
      CreateMeasurement.new(
        metric: 'Wind',
        value: 30,
        timestamp: '2024-03-24T12:00:00Z'
      ).call
    end
  end
end
