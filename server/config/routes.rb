# frozen_string_literal: true

Rails.application.routes.draw do
  get 'up' => 'rails/health#show', as: :rails_health_check
  root to: 'application#not_found'

  namespace 'api' do
    namespace 'v1' do
      get 'metrics' => 'metrics#all'
      post 'metrics' => 'metrics#create'
      get 'metrics/measurements' => 'metrics#by_period'
      post 'metrics/measurements' => 'measurements#create'
    end
  end
end
