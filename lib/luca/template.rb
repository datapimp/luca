require 'tilt'

module Luca
  class Template < Tilt::Template
    attr_accessor :namespace
    def self.default_mime_type
      'application/javascript'
    end

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
      self.namespace = "window.JST"
    end

    def evaluate(scope, locals, &block)
      compiled = @engine.render(scope, locals, &block)
      code = EJS.compile(compiled)
      tmpl = scope.logical_path 

      tmpl.gsub! /^.*\/templates\//, ''

      <<-JST

(function() {
  #{namespace} || (#{namespace} = {});
  #{namespace}[#{ tmpl.inspect }] = #{indent(code)};
}).call(this);

      JST
    end

    private

      def indent(string)
        string.gsub(/$(.)/m, "\\1  ").strip
      end

  end
end

