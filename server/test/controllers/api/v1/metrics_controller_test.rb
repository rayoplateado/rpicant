# frozen_string_literal: true

require 'test_helper'

class MetricsControllerTest < ActionDispatch::IntegrationTest
  test 'should return a metrics list' do
    get api_v1_metrics_url
    data = JSON.parse(response.body)['data']
    assert data.length == 3
  end

  test 'should return a list of metric measurements grouped by period' do
    get api_v1_metrics_measurements_url period: 'minute'
    body = JSON.parse(response.body)
    assert_not body['data'].empty?
    body['data'].each do |ms|
      assert ms.key?('date')
      assert ms.key?('Heart Rate') || ms.key?('Hours Sleep') || ms.key?('Steps')
    end
  end
end
