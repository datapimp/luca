namespace :luca do
  desc "Download the vendor dependencies for a luca app"
  task :dependencies do
    base = 'https://raw.github.com/datapimp/luca/master/assets/javascripts/dependencies/'

    scripts = [
      'underscore-min.js',
      'underscore-string.min.js',
      'backbone-min.js',
      'backbone-query.min.js'
    ]

    scripts.each do |script|
      puts "Downloading #{ script } from #{ base + script }"
      `wget -q #{ base + script } > #{ Rails.root }/vendor/assets/javascripts/#{ script }` 
      FileUtils.mv(script, "#{ Rails.root }/vendor/assets/javascripts")
    end
  end
end
