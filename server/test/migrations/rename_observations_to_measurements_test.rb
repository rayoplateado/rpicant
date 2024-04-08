# frozen_string_literal: true

require 'test_helper'

class SplitMetricMigrationTest < ActiveSupport::TestCase
  MIGRATION_VERSION = 20_240_331_173_647
  def setup
    # Run just the specific migration you're testing
    @migration_context = ActiveRecord::MigrationContext.new('db/migrate/', ActiveRecord::SchemaMigration)
  end

  def teardown
    @migration_context.run(:down, MIGRATION_VERSION)
  end

  test 'should rename the observations table' do
    @migration_context.run(:up, MIGRATION_VERSION)

    assert_not ActiveRecord::Base.connection.table_exists?(:observations), 'observations table shouldn\'t exist'
    assert ActiveRecord::Base.connection.table_exists?(:measurements), 'measurements table should exist'
    @migration_context.run(:down, MIGRATION_VERSION)

    assert ActiveRecord::Base.connection.table_exists?(:observations), 'observations should exist after rollback'
    assert_not ActiveRecord::Base.connection.table_exists?(:measurements),
               'measurements table shouldn\'t exist after rollback'
  end
end
