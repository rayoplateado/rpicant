# frozen_string_literal: true

require 'test_helper'

class MeasurementsControllerTest < ActionDispatch::IntegrationTest
  test 'should create measurements and metric if metric is not present' do
    assert_difference ['Measurement.count', 'Metric.count'], 1 do
      body = { metric: 'Wind', value: 10, timestamp: '2024-03-24T18:01:00' }
      post api_v1_metrics_measurements_url, params: body, as: :json
    end
  end
end
