require 'rails/generators'

module Luca
  module Generators
    class ApplicationGenerator < ::Rails::Generators::Base
      source_root File.expand_path('../templates', __FILE__)
      
      desc "Generate a base Luca application"
      
      argument :application_name, :type => :string, :default => "luca_app"

      def generate_controller
        template "controller.rb", "app/controllers/#{application_name}_controller.rb"
      end

      def generate_view
        template "index.html.#{template_extension}", "app/views/#{application_name}/index.html.#{template_extension}"
      end

      def generate_route
        sentinel = /\.routes\.draw do(?:\s*\|map\|)?\s*$/
        routing_code = "get '/#{application_name}', :to => '#{application_name}#index'"

        in_root do
          inject_into_file 'config/routes.rb', "\n  #{routing_code}\n", { :after => sentinel, :verbose => false }
        end
      end

      def generate_javascript
        file_extension = "js.coffee"
        template "javascripts/application.#{file_extension}", "app/assets/javascripts/#{application_name}/application.#{file_extension}"
        template "javascripts/dependencies.#{file_extension}", "app/assets/javascripts/#{application_name}/dependencies.#{file_extension}"
        template "javascripts/index.#{file_extension}", "app/assets/javascripts/#{application_name}/index.#{file_extension}"
        template "javascripts/router.#{file_extension}", "app/assets/javascripts/#{application_name}/router.#{file_extension}"
        template "javascripts/home.#{file_extension}", "app/assets/javascripts/#{application_name}/views/home.#{file_extension}"
        template "javascripts/config.#{file_extension}", "app/assets/javascripts/#{application_name}/config.#{file_extension}"
        template "javascripts/home.jst.ejs", "app/assets/javascripts/#{application_name}/templates/home.jst.ejs"
        
        empty_directory_with_gitkeep("app/assets/javascripts/#{application_name}/models")
        empty_directory_with_gitkeep("app/assets/javascripts/#{application_name}/collections")
        empty_directory_with_gitkeep("app/assets/javascripts/#{application_name}/views")
        empty_directory_with_gitkeep("app/assets/javascripts/#{application_name}/lib")
        empty_directory_with_gitkeep("app/assets/javascripts/#{application_name}/util")
      end

      private

      def application_class_name
        application_name.underscore.camelize
      end

      def javascript_namespace
        application_class_name.gsub("::", "")
      end

      def template_extension
        ::Rails.configuration.app_generators.rails[:template_engine] || :erb
      end

      def javascript_extension
        ::Rails.configuration.app_generators.rails[:javascript_engine] || :js
      end

      def empty_directory_with_gitkeep(destination)
        empty_directory(destination)
        create_file("#{destination}/.gitkeep")
      end
      
    end
  end
end


