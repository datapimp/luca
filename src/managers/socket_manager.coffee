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

    @loadProviderSource()

  connect: ()->
    switch @options.provider
      when "socket.io"
        @socket = io.connect( @options.host )
      when "faye.js"
        @socket = new Faye.Client( @options.host )

  providerSourceLoaded: ()-> 
    @connect()

  providerSourceUrl: ()->
    switch @options.provider
      when "socket.io" then "#{ @options.host }/socket.io/socket.io.js"
      when "faye.js" then "#{ @options.host }/faye.js"

  loadProviderSource: ()->
    script = document.createElement 'script'
    script.setAttribute "type", "text/javascript"
    script.setAttribute "src", @providerSourceUrl()
    script.onload = _.bind(@providerSourceLoaded,@)

    if Luca.util.isIE()
      script.onreadystatechange = ()=>
        if script.readyState is "loaded"
          @providerSourceLoaded()

    document.getElementsByTagName('head')[0].appendChild script
