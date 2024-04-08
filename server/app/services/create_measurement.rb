# frozen_string_literal: true

# Create a Measurement. If no metric with the name given exists, creates one.
class CreateMeasurement
  def initialize(metric:, value:, timestamp:)
    @metric = Metric.find_or_create_by!(name: metric)
    @value = value
    @timestamp = timestamp
  end

  def call
    @metric.measurements.create(value: @value, timestamp: @timestamp)
  end
end
