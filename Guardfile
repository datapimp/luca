require './app'

assets_path = Dir.pwd + '/vendor/assets'
javascript_path = File.join( assets_path, 'javascripts' )
stylesheets_path = File.join( assets_path, 'stylesheets' )

unless ENV['TEST_MODE']
  unless ENV['SKIP_JAVASCRIPTS']
    guard 'sprockets2', :clean=>false, :assets_path => javascript_path, :sprockets => App.sprockets, :precompile=>[/^luca-ui.+(coffee|js)$/], :digest => false, :gz => false do
      watch(%r{^src/.+$})
      watch(%r{^spec/.+$})
    end
  end

  unless ENV['SKIP_STYLESHEETS']
    guard 'sprockets2', :clean=>false, :assets_path => stylesheets_path, :sprockets => App.sprockets, :precompile=>[/^luca-ui.+(scss|css)$/], :digest => false, :gz => false do
      watch(%r{^src/stylesheets/.+$})
    end
  end
end

unless ENV['COMPILE_MODE']
  guard 'jasmine' do
    watch(%r{src/(.+)\.coffee}) {|m| "spec/#{ m[1] }_spec.coffee" }
    watch(%r{spec/(.+)_spec\.coffee})
  end
end
