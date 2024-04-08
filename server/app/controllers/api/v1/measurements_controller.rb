# frozen_string_literal: true

module Api
  module V1
    # Controls access to the Measurement model
    class MeasurementsController < ApplicationController
      def create
        data = JSON.parse(request.body.read)
        measurement = CreateMeasurement.new(
          metric: data['metric'],
          value: data['value'],
          timestamp: data['timestamp']
        ).call
        render json: { data: measurement }, status: :created
      end
    end
  end
end
