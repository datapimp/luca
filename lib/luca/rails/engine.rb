module Luca
  module Rails
    class Engine < ::Rails::Engine
      initializer "luca.register_template" do |app|
        app.assets.register_engine ".luca", Luca::Template
      end
    end
  end
end

