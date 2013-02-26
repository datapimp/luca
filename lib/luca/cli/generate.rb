module Luca
  module Cli
    class Generate < Thor
      namespace :generate

      desc "generate", "generate GENERATOR [options]"

      method_options :name => :string
      method_option :assets_root, :default => File.join(Dir.pwd(),"app","assets")
      method_option :root, :default => Dir.pwd()
      method_option :export_location, :default => Dir.pwd()

      def generate generator
        if generator == "docs"
          documentation(options[:name], options)
        end

        if generator == "application"
          application(options[:name], options)
        end
      end

      no_tasks do
        def application application_name, options={}

        end

        def documentation application_name, options={}
          app = Luca::LucaApplication.new(application_name, options)
          puts "Exporting application documentation for #{ application_name } to #{ app.export_file_location }..."
          puts "Found #{ app.component_definitions.length } component definitions"
          app.export
        end
      end
    end
  end
end
