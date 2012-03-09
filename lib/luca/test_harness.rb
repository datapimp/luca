require 'sinatra/base'

module Luca
  module AssetHelpers
    def asset_path(source)
      "/assets/" + settings.sprockets.find_asset(source).digest_path
    end
  end

  class TestHarness < Sinatra::Base

    class << self
      attr_accessor :manifest

      def add_asset profile, asset
        manifest[profile] ||= []
        manifest[profile] << asset
      end
    end

    @manifest = {}

    get "/specs/:application_profile" do
      manifest = self.class.manifest[ params[:application_profile] ] || []

      manifest.map! do |asset|
        "/assets/#{ settings.sprockets.find_asset(asset).digest_path }"
      end

      manifest.compact!

      @javascripts = manifest.select {|asset| asset.match(/js$/) }
      @stylesheets = manifest.select {|asset| asset.match(/css$/) }

      erb :spec_harness
    end
  end
end