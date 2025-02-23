# frozen_string_literal: true

Rails.application.config.generators do |g|
  g.skip_routes true
  g.helper false
  g.assets false
  g.helper_specs false
  g.controller_specs false
  g.system_tests false
  g.view_specs false
end
