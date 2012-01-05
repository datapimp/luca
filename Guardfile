require './app'

guard 'sprockets2', :assets_path => Dir.pwd + '/vendor/assets', :sprockets => App.sprockets, :precompile=>[/^luca-ui.(coffee|js|css|scss)$/], :digest => false, :gz => false do
  watch(%r{^src/.+$})
  watch('app.rb')
end
