# frozen_string_literal: true

require 'simplecov'
SimpleCov.start 'rails' do
  SimpleCov.minimum_coverage 100
end

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

module ActiveSupport
  class TestCase
    parallelize(workers: :number_of_processors)
    fixtures :all
  end
end
