task :environment do
  require './app'
  require 'pry'
end

namespace :release do
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
  task :gem do
    `gem build luca.gemspec`
  end

end
