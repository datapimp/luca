$LOAD_PATH.unshift(File.dirname(__FILE__))
module Luca
  def self.base_path
    File.join(File.dirname(__FILE__), '..')
  end
end

require 'luca/version'

if defined?(::Rails)
  require 'luca/rails'
end

require 'luca/collection'
require 'luca/asset_compiler'
require 'luca/compiled_asset'
require 'luca/component_definition'
require 'luca/luca_application'
require 'luca/project'
require 'luca/code_sync/watcher'
require 'luca/code_sync/server'
require 'luca/project_harness'
require 'luca/stylesheet'
require 'luca/template_asset'
require 'luca/test_harness'
