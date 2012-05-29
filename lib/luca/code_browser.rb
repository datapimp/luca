require 'sinatra/base'

module Luca
  class CodeBrowser < Sinatra::Base

    class << self
      attr_accessor :source_locations, :source_map
    end

    def self.look_for_source_in location=""
      @source_locations ||= []
      @source_locations << "#{ location }/**/*.coffee" if File.exists?(location)

      @source_locations
    end

    def self.map_source
      @source_map = {}

      (self.source_locations || []).map do |location|
        files = Dir.glob( location )
        files.inject( @source_map ) do |memo, file|
          definitions = IO.read(file).lines.to_a.grep /_\.def/

          definitions.each do |definition|
            component = definition.match(/_\.def\(['"](.+)['"]\)\./)

            if component and component[1]
              componentId = component[1].gsub(/['"].*$/,'')
              memo[ componentId ] = file if componentId
            end
          end

          memo
        end
      end

      @source_map
    end

    def self.lookup_component component=""
      map_source[ component ]
    end

    def self.get_component_source file=""
      IO.read( file ) rescue ""
    end

    def self.get_source_for component=""
      path_to_file = lookup_component( component )
      get_component_source( path_to_file )
    end

  end
end