#!/usr/bin/env ruby


if __FILE__==$0
  require 'pry'
end

module Luca
  module Documentation
    COMMENTS_REGEX =  /(^\s*#.*$\n)*/
    ARGUMENTS_REGEX = /^(.*)=(.+)/


    def self.root
      "#{File.expand_path '../../../..', __FILE__}"
    end

    def self.find_file component_name
      if component_name.downcase != component_name
        component_name = underscore component_name
      end
      matching_files = Dir.glob("#{root}/app/assets/javascripts/**/#{component_name}.coffee")
      if matching_files.count == 1
        return matching_files[0]
      else
        raise "Multiple possible matches: #{matching_files}"
      end
    end

    def self.find_components path
      Dir.glob("#{root}/#{path}/**/*.coffee")
    end

    private

    def self.underscore string
      string.gsub(/::/, '/').
      gsub(/([A-Z]+)([A-Z][a-z])/,'\1_\2').
      gsub(/([a-z\d])([A-Z])/,'\1_\2').
      tr("-", "_").
      downcase
    end

  end
end

if __FILE__==$0
  pry
end
