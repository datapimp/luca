require 'sinatra/base'

module Luca
  module AssetHelpers
    def asset_path(source)
      "/assets/" + settings.sprockets.find_asset(source).digest_path
    end
  end

  class TestHarness < Sinatra::Base

    class << self
      attr_accessor :config_file, :spec_environment
    end

    def self.parse_configuration_file
      self.spec_environment = YAML.load_file(config_file)
    end

    def self.configure!
      spec_javascripts = File.join(::Rails.root,'spec','javascripts')
      locations = [ File.join(spec_javascripts,'luca.yml'), File.join(::Rails.root,'config','luca.yml') ]

      @config_file = locations.detect {|f| File.exists?(f) }

      tmp_path = File.join(::Rails.root,'tmp')

      unless sprockets.paths.include?(spec_javascripts)
        sprockets.append_path(spec_javascripts)
      end
      
      unless sprockets.paths.include?(tmp_path)
        sprockets.append_path( tmp_path )
      end

      if File.exists?( @config_file )
        parse_configuration_file
      else
      # TODO - Provide error output to the test harness URL with instructions
      # in the case the luca.yml config file does not exist 
      end
    end

    def self.load_environment
      configure!
    end

    def self.get_suite application
      @suite ||= load_environment.try(:[],"apps").try(:[], application)
    end

    def self.get_specs application
      get_suite( application ).try(:[],"specs") || []
    end

    def self.get_stylesheets application
      get_suite( application ).try(:[],"stylesheets") || []
    end

    def self.get_javascripts application
      get_suite( application ).try(:[],"scripts") || []
    end

    def self.create_tempfile type, contents
      filename = File.join(::Rails.root,'tmp', rand(8**8).to_s(10) + ".#{ type }" )  
      File.open(filename,'w+') {|fh| fh.puts(contents)} 
      filename
    end

    get "/specs/:application/specs_manifest.js" do
      @javascripts = self.class.get_specs( params[:application] )
      template_file = File.join(self.class.root,'lib','templates','spec_manifest_javascripts.erb')
      @temp_file = self.class.create_tempfile( 'js', ERB.new( IO.read(template_file) ).result( binding ) )

      self.class.sprockets[ @temp_file ].to_s
    end

    get "/specs/:application/manifest.css" do
      @stylesheets = self.class.get_stylesheets( params[:application] ) 
      template_file = File.join(self.class.root,'lib','templates','spec_manifest_stylesheets.erb')
      @temp_file = self.class.create_tempfile( 'css', ERB.new( IO.read(template_file) ).result( binding ) )

      self.class.sprockets[ @temp_file ].to_s
    end

    get "/specs/:application/manifest.js" do
      @javascripts = self.class.get_javascripts( params[:application] )
      template_file = File.join(self.class.root,'lib','templates','spec_manifest_javascripts.erb')
      @temp_file = self.class.create_tempfile( 'js', ERB.new( IO.read(template_file) ).result( binding ) )
      self.class.sprockets[ @temp_file ].to_s
    end

    get "/specs/:application" do
      erb :spec_harness
    end
  end
end