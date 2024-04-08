# frozen_string_literal: true

require 'test_helper'

class MetricTest < ActiveSupport::TestCase
  test 'should save a valid metric' do
    assert Metric.new(name: 'views').save, 'could not save valid metric'
  end

  test 'should not be valid without a name' do
    metric = Metric.new
    assert_not metric.valid?, 'a metric should have a name'
  end

  test 'should not be valid when name\'s too short' do
    metric = Metric.new(name: 'vi')
    assert_not metric.valid?, 'a metric\'s name should be longer then 2 characters'
  end

  test 'should not be valid when name\'s too long' do
    name = <<~TEXT
      Hey Jude, dont make it bad.
      Take a sad song and make it better.
      Remember to let her into your heart, then you can start to make it better.
    TEXT
    metric = Metric.new(name:)
    assert_not metric.valid?, 'a metric\'s name should not be longer than 40 characters'
  end
end
