# Luca.SocketManager is an abstraction
# around various websocket services such as
# faye.js, socket.io, now.js, etc.
#
# It provides a common interface for adding
# push / async functionality to Collections, 
# Models, and the like, regardless of the
# transport mechanism used
class Luca.SocketManager
  constructor: (@options={})->
    _.extend Backbone.Events

    @loadTransport()
  
  connect: ()->
    switch @options.provider
      when "socket.io"
        @socket = io.connect( @options.socket_host )
      when "faye.js"
        @socket = new Faye.Client( @options.socket_host )

  #### Transport Loading and Configuration
  
  transportLoaded: ()-> @connect()

  transport_script: ()->
    switch @options.provider
      when "socket.io" then "#{ @options.transport_host }/socket.io/socket.io.js"
      when "faye.js" then "#{ @options.transport_host }/faye.js"

  loadTransport: ()->
    script = document.createElement 'script'
    script.setAttribute "type", "text/javascript"
    script.setAttribute "src", @transport_script()     
    script.onload = @transportLoaded

    if Luca.util.isIE()
      script.onreadystatechange = ()=>
        if script.readyState is "loaded"
          @transportLoaded()

    document.getElementsByTagName('head')[0].appendChild script

window.SocketManager = SocketManager
