#!/usr/bin/env ruby


if __FILE__==$0
  require 'pry'
end

require 'json'
require "#{Dir.pwd}/lib/luca/documentation/documentation.rb"
require "#{Dir.pwd}/lib/luca/documentation/component_documentation.rb"

module Luca
  module Documentation
    class DocumentationCompiler
      def self.documentation_for_path path
        files_to_include = Luca::Documentation.find_components path
        files_to_include.inject(Hash.new) do |memo, file|
          component_documentation = Luca::Documentation::ComponentDocumentation.new file
          component_name = file.split("/").last.split('.').first()
          memo[component_name.to_sym] = {}
          component_documentation.find_methods.each do |method|
            memo[component_name.to_sym][method.to_sym] = component_documentation.method_data_for(method).all
          end
          memo
        end
      end
    end
  end
end



if __FILE__==$0
  pry
end
