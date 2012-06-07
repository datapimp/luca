
require 'rubygems'
require 'bundler'
Bundler.require

require 'rubygems'
require 'faker'

module AssetHelpers
  def asset_path(source)
    "/assets/" + settings.sprockets.find_asset(source).digest_path
  end
end

require "#{ File.expand_path('../', __FILE__) }/lib/sprockets/luca_template.rb"
require "#{ File.expand_path('../', __FILE__) }/lib/luca/code_browser.rb"

class App < Sinatra::Base
  set :root, File.expand_path('../', __FILE__)
  set :sprockets, Sprockets::Environment.new(root)
  set :precompile, [ /\w+\.(?!js|css).+/, /application.(css|js)$/ ]
  set :assets_prefix, 'assets'
  set :assets_path, File.join(root, 'public', assets_prefix)

  sprockets.register_engine '.luca', Sprockets::LucaTemplate

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

  get "/jasmine" do
    erb :jasmine
  end

  Luca::CodeBrowser.look_for_source_in( File.join(File.expand_path('../', __FILE__),'src') )

  get "/components" do
    if params[:component]
      component = params[:component]
      source = Luca::CodeBrowser.get_source_for( component )
      {}.merge(:className => component, :source => source).to_json
    else
      Luca::CodeBrowser.map_source
    end
  end

end
