$LOAD_PATH.unshift(File.dirname(__FILE__))
module Luca
  Version = '0.9.9'
  def self.base_path
    File.join(File.dirname(__FILE__), '..')
  end
end

require 'luca/rails'
require 'luca/collection'
require 'luca/asset_compiler'
require 'luca/compiled_asset'
require 'luca/component_definition'
require 'luca/luca_application'
require 'luca/project'
require 'luca/project_harness'
require 'luca/stylesheet'
require 'luca/template_asset'
require 'luca/test_harness'
