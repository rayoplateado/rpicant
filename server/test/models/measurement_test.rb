# frozen_string_literal: true

require 'test_helper'

class MeasurementTest < ActiveSupport::TestCase
  test 'should save a valid measurement' do
    metric = metrics(:heart_rate)
    measurement = Measurement.new(value: 3, timestamp: '2024-03-07T02:05:09', metric:)
    assert measurement.save, 'could not save valid measurement'
  end

  test 'should not be valid without timestamp' do
    metric = metrics(:heart_rate)
    measurement = Measurement.new(value: 3, metric:)
    assert_not measurement.valid?, 'measurement without a timestamp shoudn\'t be valid'
  end
end
