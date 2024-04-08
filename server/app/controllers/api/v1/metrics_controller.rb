# frozen_string_literal: true

module Api
  module V1
    # Controls the access to the Metric model
    class MetricsController < ApplicationController
      def all
        render json: { data: Metric.all }
      end

      def by_period
        period = params[:period] || 'day'
        averages = ReadAveragesByPeriod.new(period, metrics: params['metrics']).call
        render json: { data: parse_list(averages) }
      end

      private

      def parse_list(averages)
        agg = averages.each_with_object({}) do |((date, metric), value), memo|
          memo[date] ||= {}
          memo[date][metric] = value
        end
        agg.sort
           .map { |date, record| { date:, **record } }
      end
    end
  end
end
