
task :environment do
  require './app'
  require 'pry'
end


stylesheets = ["luca-ui-bootstrap.css","luca-ui-development-tools.css","sandbox.css"]  
scripts = ["dependencies.js","sandbox.js"]

namespace :source do
  desc "Create a source map for the project"
  task :map => :environment do
    require 'json'
    source_map = {}

    (["src/**/*.coffee","assets/javascripts/sandbox/**/*.coffee"]).map do |location|
      files = Dir.glob( location )
      files.inject(source_map) do |memo,file|
        definitions = IO.read(file).lines.to_a.grep /_\.def/

        definitions.each do |definition|
          component = definition.match(/_\.def\(['"](.+)['"]\)\./)

          if component and component[1]
            componentId = component[1].gsub(/['"].*$/,'')
            if componentId
              memo[ componentId ] = {className:componentId,file:file,source:IO.read(file)}
            end
          end
        end

        memo
      end

    end

    sourceMapFile = File.join( App.root, 'site', 'source-map.js')

    File.open(sourceMapFile,'w+') do |fh| 
      fh.puts( JSON.generate( source_map.values ) )
    end

  end
end

namespace :release do
  desc "Compile and Minify"
  task :all => [:assets,:minify]
  desc "Compile all the assets"
  task :assets => :environment do
    File.open( File.join(App.root,'vendor','assets','stylesheets','luca-development.css'), 'w+' ) do |fh|
      fh.puts(App.sprockets["luca/development.css"].to_s)
    end
    File.open( File.join(App.root,'vendor','assets','stylesheets','luca-components.css'), 'w+' ) do |fh|
      fh.puts(App.sprockets["luca.css"].to_s)
    end
    File.open( File.join(App.root,'tmp','luca.js'), 'w+' ) do |fh|
      fh.puts(App.sprockets["luca.js"].to_s)
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
    `rm tmp/*.js`
  end

  desc "Build the gem"
  task :gem => [:assets,:minify] do
    `gem build luca.gemspec`
  end

end
