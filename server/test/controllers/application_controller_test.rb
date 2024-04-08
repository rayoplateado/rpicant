# frozen_string_literal: true

require 'test_helper'

class TestErrorsController < ApplicationController
  def record_not_found
    raise ActiveRecord::RecordNotFound
  end

  def record_invalid
    record = Metric.new
    record.errors.add(:base, 'Test error')
    raise ActiveRecord::RecordInvalid.new(record), 'Test error'
  end
end

class ApplicationControllerTest < ActionDispatch::IntegrationTest
  include Rails.application.routes.url_helpers

  setup do
    @routes = Rails.application.routes
    @routes.draw do
      get 'test/record_not_found', to: 'test_errors#record_not_found'
      get 'test/record_invalid', to: 'test_errors#record_invalid'
    end
  end

  teardown do
    Rails.application.reload_routes!
  end

  test 'should rescue from ActiveRecord::RecordNotFound' do
    get test_record_not_found_url
    assert_response :not_found
  end

  test 'should rescue from ActiveRecord::RecordInvalid' do
    get test_record_invalid_url
    assert_response :unprocessable_entity
    assert_includes @response.body, 'Test error'
  end
end
