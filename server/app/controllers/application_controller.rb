# frozen_string_literal: true

# ApplicationController - recovers from ActiveRecords exceptions
class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :invalid

  private

  def not_found
    render json: { message: 'route_not_found' }, status: :not_found
  end

  def invalid(execption)
    render json: { message: 'unprocessable_entity', errors: formatted_errors(execption.record) },
           status: :unprocessable_entity
  end

  def formatted_errors(record)
    return if record.nil?

    record.errors.messages.map do |field, messages|
      { field:, message: messages.uniq.join(', ') }
    end
  end
end
