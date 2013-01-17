namespace :luca do
  desc "Create a Luca::Project for this app"
  task :project => :environment do |t, args|
    current_folder = Rails.root
    name = ENV['name'] 
    Luca::Project.find_or_create_by_name(name, :path => current_folder.to_s )
  end

  desc "Download the vendor dependencies for a luca app"
  task :dependencies do
    base = 'https://raw.github.com/datapimp/luca/master/assets/javascripts/dependencies/'

    scripts = [
      'underscore-min.js',
      'underscore-string.min.js',
      'bootstrap.min.js',
      'backbone-min.js',
      'backbone-query.min.js'
    ]

    scripts.each do |script|
      puts "Downloading #{ script } from #{ base + script }"
      `wget -q #{ base + script } > #{ Rails.root }/vendor/assets/javascripts/#{ script }` 
    end

    style_base =  "https://raw.github.com/datapimp/luca/master/assets/stylesheets/"

    stylesheets = [
      'bootstrap.min.css',
      'bootstrap-responsive.min.css'
    ]

    stylesheets.each do |stylesheet|
      puts "Downloading #{ stylesheet } from #{ style_base + stylesheet }"
      `wget -q #{ style_base + stylesheet } > #{ Rails.root }/vendor/assets/dependencies/#{ stylesheet }` 
    end  
  end
end
