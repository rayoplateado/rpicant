# frozen_string_literal: true

Metric.destroy_all

start_date = 7.days.ago.beginning_of_day
end_date = Time.zone.now.beginning_of_day

weather_metrics = { 'Temperature' => [5, 15], 'Humidity' => [60, 100] } # Adjust base values [min, max] for each metric

weather_metrics.each_key do |metric_name|
  metric = Metric.create!(name: metric_name)

  (start_date.to_date..end_date.to_date).each do |date|
    base_value = rand(weather_metrics[metric_name][0]..weather_metrics[metric_name][1])

    24.times do |hour| # For each hour of the day
      # Generate a random minute for the measurement within the hour
      random_minute = rand(0..59)

      2.times do |_index| # Create two measurements for the random minute
        # Simulate diurnal pattern for temperature
        if metric_name == 'Temperature'
          hour_value = base_value + (Math.sin((hour - 6) * Math::PI / 12) * 10).round
        else # For Humidity
          hour_value = base_value - (Math.sin((hour - 6) * Math::PI / 12) * 10).round
          hour_value = [hour_value, 100].min # Ensure humidity doesn't exceed 100%
        end

        # Adjust for some variability
        hour_variation = rand(-3..3)
        final_value = hour_value + hour_variation

        metric.measurements.create!(
          timestamp: date.beginning_of_day + hour.hours + random_minute.minutes,
          value: final_value
        )
      end
    end
  end
end

Rails.logger.debug "Created #{Metric.count} Metrics"
