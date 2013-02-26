
task :environment do
  require './app'
  require 'pry'
  require 'luca'
end


stylesheets = ["luca-ui-bootstrap.css","luca-ui-development-tools.css","sandbox.css"]  
scripts = ["dependencies.js","sandbox.js"]

namespace :release do
  desc "Zip up the assets"
  task :zip => :environment do
    `cp vendor/assets/javascripts/luca.min.js vendor/assets/javascripts/luca-dependencies.min.js vendor/assets/stylesheets/luca-ui.css .`  
    `zip downloads/luca-#{ Luca::Version }.zip luca.min.js luca-dependencies.min.js luca-ui.css`
    `mv luca-ui.css luca.min.js luca-dependencies.min.js downloads`
  end

  desc "Compile and Minify"
  task :all => [:assets,:minify,:zip]
  desc "Compile all the assets"
  task :assets => :environment do
    File.open( File.join(App.root,'vendor','assets','stylesheets','luca-development.css'), 'w+' ) do |fh|
      fh.puts(App.sprockets["luca/development.css"].to_s)
    end
    File.open( File.join(App.root,'vendor','assets','stylesheets','luca-components.css'), 'w+' ) do |fh|
      fh.puts(App.sprockets["luca.css"].to_s)
    end
    File.open( File.join(App.root,'tmp','luca.js'), 'w+' ) do |fh|
      fh.puts(App.sprockets["luca.js"].to_s + "\n\n\nLuca.VERSION='#{ Luca::Version }';")
    end
    File.open( File.join(App.root,'tmp','luca-development.js'), 'w+' ) do |fh|
      fh.puts(App.sprockets["luca/development.js"].to_s)
    end
    File.open( File.join(App.root,'tmp','luca-dependencies.js'), 'w+' ) do |fh|
      fh.puts(App.sprockets["luca/dependencies.js"].to_s)
    end
  end

  desc "Minify the assets"
  task :minify do
    `uglifyjs tmp/luca.js > vendor/assets/javascripts/luca.min.js`
    `uglifyjs tmp/luca-development.js > vendor/assets/javascripts/luca-development.min.js`
    `uglifyjs tmp/luca-dependencies.js > vendor/assets/javascripts/luca-dependencies.min.js`
    `cat vendor/assets/javascripts/luca-dependencies.min.js vendor/assets/javascripts/luca.min.js > vendor/assets/javascripts/luca.full.min.js`
    `rm tmp/*.js`
  end

  desc "Build the gem"
  task :gem => [:assets,:minify,:zip] do
    `gem build luca.gemspec`
  end

end
