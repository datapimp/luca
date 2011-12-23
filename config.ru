require './app'

# I'm leaning more towards not mounting the sprockets rack application and just relying on the precompiler with guard.
# If you want to mount the Sprockets Rack Application, uncomment the following lines:
# map "/assets" do
#   run App.sprockets
# end

map "/" do
  run App
end