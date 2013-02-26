require 'hogan_assets'
module Luca
  module Rails
    class Engine < ::Rails::Engine
      rake_tasks do
        load "railties/luca/tasks.rake"
      end 

      initializer "luca.register_template" do |app|
        app.assets.register_engine ".luca", Luca::Template
        Luca::TestHarness.set(:sprockets,app.assets)
        Luca::TestHarness.set :root, File.expand_path('../../../../', __FILE__)
      end

      initializer "sprockets.hogan", :after => "sprockets.environment", :group => :all do |app|
        HoganAssets::Config.configure do |config|
          config.template_namespace = 'JST'
        end        
      end      

    end
  end
end

