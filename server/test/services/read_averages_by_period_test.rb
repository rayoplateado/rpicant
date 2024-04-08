# frozen_string_literal: true

require 'test_helper'

class ReadByPeriodTest < ActionDispatch::IntegrationTest
  test 'should resource grouped by period minute' do
    result = ReadAveragesByPeriod.new('minute').call
    assert result.length == 6
  end

  test 'should return resource  grouped by hour' do
    result = ReadAveragesByPeriod.new('hour').call
    assert result.length == 4
  end

  test 'should return resource grouped by day' do
    result = ReadAveragesByPeriod.new('day').call
    assert result.length == 4
  end

  test 'should be able to receive a metrics list' do
    result = ReadAveragesByPeriod.new('minute', metrics: ['Heart Rate']).call
    assert result.length == 2
  end
end
