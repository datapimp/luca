task :environment do
  require './app'
  require 'pry'
end

namespace :assets do
  desc "Compile all the assets"
  task :precompile => :environment do
    File.open( File.join(App.root,'release','luca-ui.js'), 'w+' ) do |fh|
      fh.puts(App.sprockets["luca-ui.js"].to_s)
    end
  end

  desc "Remove compiled assets"
  task :clean => :environment do

  end
end
