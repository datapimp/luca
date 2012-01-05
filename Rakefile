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
  end

  desc "Build the gem" 
  task :gem do
    `gem build luca.gemspec`
  end

  desc "Push a new release to github"
  task :push => :assets do
    `git commit -a -m "pushing new release"`
    `git push origin master`
  end
end
