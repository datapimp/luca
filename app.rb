require 'bundler'
Bundler.require

module AssetHelpers
  def asset_path(source)
    "/assets/" + settings.sprockets.find_asset(source).digest_path
  end
end

class App < Sinatra::Base
  set :root, File.expand_path('../', __FILE__)
  set :sprockets, Sprockets::Environment.new(root)
  set :precompile, [ /\w+\.(?!js|css).+/, /application.(css|js)$/ ]
  # set :precompile, [ /.*/ ]
  set :assets_prefix, 'assets'
  set :assets_path, File.join(root, 'public', assets_prefix)
  
  configure do
    sprockets.append_path(File.join(root, 'assets', 'stylesheets'))
    sprockets.append_path(File.join(root, 'assets', 'javascripts'))
    sprockets.append_path(File.join(root, 'assets', 'images'))

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
end