require './app'

assets_path = Dir.pwd + '/vendor/assets'
javascript_path = File.join( assets_path, 'javascripts' )
stylesheets_path = File.join( assets_path, 'stylesheets' )

guard 'sprockets2', :assets_path => assets_path, :sprockets => App.sprockets, :precompile=>[/^luca-ui.+(coffee|js|css|scss)$/], :digest => false, :gz => false do
  watch(%r{^src/.+$})
  watch(%r{^spec/.+$})

  callback(:run_on_change_end) do
    compiled = Dir.glob( assets_path + '/luca-ui*' )

    compiled.each do |file|
      if File.extname(file) == ".js"
        FileUtils.mkdir_p javascript_path
        FileUtils.cp file, javascript_path
      end

      if File.extname(file) == ".css"
        FileUtils.mkdir_p stylesheets_path
        FileUtils.cp file, stylesheets_path
      end
    end
  end
end

guard 'jasmine', :port => 9292, :jasmine_url => "http://lvh.me:9292/jasmine/index.html" do
  watch(%r{src/(.+)\.coffee}) {|m| "spec/#{ m[1] }_spec.coffee" }
  watch(%r{spec/(.+)_spec\.coffee}) {|m| "src/#{ m[1] }.coffee" }
end
