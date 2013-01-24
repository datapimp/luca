require './app'
guard 'jasmine' do
  watch(%r{src/(.+)\.coffee}) {|m| "spec/#{ m[1] }_spec.coffee" }
  watch(%r{spec/(.+)_spec\.coffee})
end
