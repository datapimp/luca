#!/usr/bin/env ruby


if __FILE__==$0
  require 'pry'
  require 'json'
end

module Luca
  module Documentation
    class DocumentationCompiler
      def self.documentation_for_module module_name
        files_to_include = Luca::Documentation.find_components module_name

      end
    end
  end
end



if __FILE__==$0
  pry
end
