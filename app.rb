$LOAD_PATH.unshift( File.join(File.dirname(__FILE__),'lib') )
require 'rubygems'
require 'bundler'
require 'luca'
Bundler.require(:default, :development)

require 'faker'

module AssetHelpers
  def asset_path(source)
    "/assets/" + settings.sprockets.find_asset(source).digest_path
  end
end

module Luca
  class Template
    def self.namespace
      "Luca.templates"
    end
  end
end

class App < Sinatra::Base
  set :root, File.expand_path('../', __FILE__)
  set :sprockets, Sprockets::Environment.new(root)
  set :assets_prefix, 'assets'
  set :assets_path, File.join(root, 'public', assets_prefix)

  sprockets.register_engine '.luca', Luca::Template 

  configure do
    HoganAssets::Config.configure do |config|
      config.template_namespace = 'JST'
    end    
    
    sprockets.append_path(File.join(root, 'app', 'assets', 'stylesheets'))
    sprockets.append_path(File.join(root, 'app', 'assets', 'javascripts'))
    sprockets.append_path(File.join(root, 'vendor', 'assets', 'javascripts'))
    sprockets.append_path(File.join(root, 'vendor', 'assets', 'stylesheets'))
    sprockets.append_path(File.join(root, 'vendor', 'assets', 'images'))

    sprockets.context_class.instance_eval do
      include AssetHelpers
    end

  end

  helpers do
    include AssetHelpers
  end

  get "/" do
    erb :index
  end

  get "/jasmine" do
    erb :jasmine
  end

end
