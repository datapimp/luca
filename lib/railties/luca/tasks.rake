namespace :luca do
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
