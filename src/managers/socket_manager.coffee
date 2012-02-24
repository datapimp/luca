# Luca.SocketManager is an abstraction
# around various websocket services such as
# faye.js, socket.io, now.js, etc.
#
# It provides a common interface for adding
# push / async functionality to Collections, 
# Models, and the like, regardless of the
# transport mechanism used.  
#
# Simply bind to it, and any message that comes 
# across the channel you subscribe to, will be
# bubbled up as a Backbone.Event with the message
# contents as your argument
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
  #
  # Luca wraps several popular client side socket abstractions
  # such as socket.io or faye.js ( more coming soon )
  #
  # it provides a common interface on top of these and just
  # treats them as Backbone.Events which you bind to like you
  # would on any other Backbone class
  
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
