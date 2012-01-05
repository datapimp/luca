task :environment do
  require './app'
  require 'pry'
end

namespace :assets do
  desc "Compile all the assets"
  task :precompile => :environment do
    File.open( File.join(App.root,'vendor','assets','stylesheets','luca-ui.css'), 'w+' ) do |fh|
      fh.puts(App.sprockets["luca-ui.css"].to_s)
    end

    File.open( File.join(App.root,'vendor','assets','javascripts','luca-ui.js'), 'w+' ) do |fh|
      fh.puts(App.sprockets["luca-ui.js"].to_s)
    end
  end
end
