# frozen_string_literal: true

# Interactor to list a record that belongs to another grouped by a period and get the
class ReadAveragesByPeriod
  def initialize(period, metrics: nil)
    @period = period
    @metrics = metrics
  end

  def call
    metrics = @metrics ? Metric.where(name: @metrics) : Metric
    metrics
      .joins(:measurements)
      .select(%i[name value timestamp])
      .group_by_period(@period, :timestamp,
                       permit: %w[minute hour day], series: false,
                       format: time_format_string)
      .group(:name)
      .average(:value)
  end

  private

  def time_format_string
    {
      'minute' => '%Y-%m-%dT%H:%M:00Z',
      'hour' => '%Y-%m-%dT%H:00:00Z',
      'day' => '%Y-%m-%dT00:00:00Z'
    }[@period]
  end
end
