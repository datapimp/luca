task :environment do
  require './app'
  require 'pry'
end


stylesheets = ["luca-ui-bootstrap.css","luca-ui-development-tools.css","sandbox.css"]  
scripts = ["dependencies.js","luca-ui-bootstrap.js","luca-ui-development-tools.js","sandbox.js"]

namespace :release do
  desc "Release new version of sandbox site"
  task :sandbox => [:assets, :minify] do

    asset_folder = File.join(App.root,'site','assets')

    [stylesheets,scripts].flatten.each do |filename|
      asset = App.sprockets.find_asset(filename)
      destination = File.join( asset_folder, filename)
      puts "Generating #{ destination }"
      
      File.open( destination , 'w+' ) do |fh|
        fh.puts( asset.to_s )
      end
    end    
  end

  desc "Compile all the assets"
  task :assets => :environment do
    File.open( File.join(App.root,'vendor','assets','stylesheets','luca-ui.css'), 'w+' ) do |fh|
      fh.puts(App.sprockets["luca-ui.css"].to_s)
    end

    File.open( File.join(App.root,'vendor','assets','javascripts','luca-ui.js'), 'w+' ) do |fh|
      fh.puts(App.sprockets["luca-ui.js"].to_s)
    end

    File.open( File.join(App.root,'vendor','assets','javascripts','luca-ui-development-tools.js'), 'w+' ) do |fh|
      fh.puts(App.sprockets["luca-ui-development-tools.coffee"].to_s)
    end
  end

  desc "Minify the assets"
  task :minify do
    `uglifyjs vendor/assets/javascripts/luca-ui.js > vendor/assets/javascripts/luca-ui.min.js`
    `uglifyjs vendor/assets/javascripts/luca-ui-development-tools.js > vendor/assets/javascripts/luca-ui-development-tools.min.js`
  end

  desc "Build the gem"
  task :gem,  do
    `gem build luca.gemspec`
  end

end
