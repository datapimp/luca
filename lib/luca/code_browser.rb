require 'sinatra/base'

module Luca
  class CodeBrowser < Sinatra::Base

    class << self
      attr_accessor :source_locations
    end

    def self.look_for_source_in location=""
      @source_locations ||= []
      @source_locationa << location if File.exists?(location)

      @source_locations
    end
  end
end