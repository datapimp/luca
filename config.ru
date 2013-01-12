require 'rubygems'
require 'faye'

bayeux = Faye::RackAdapter.new(
  mount: "/faye" ,
  timeout: 45)

bayeux.listen( ENV['FAYE_PORT'] || 9292 )

run bayeux

require './app'

map "/assets" do
  run App.sprockets
end

map "/" do
  run App
end
