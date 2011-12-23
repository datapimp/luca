require 'tilt'

module Sprockets
  class LucaTemplate < Tilt::Template
    def self.engine_initialized?
      defined? ::EJS
      defined? ::Haml
    end

    def initialize_engine
      require_template_library 'ejs'
      require_template_library 'haml'
    end

    def prepare
      options = @options.merge(:filename => eval_file, :line => line, :escape_attrs => false)
      @engine = ::Haml::Engine.new(data, options)
    end

    def evaluate(scope, locals, &block)
      compiled = @engine.render(scope, locals, &block)
      EJS.compile compiled 
    end
  end
end

