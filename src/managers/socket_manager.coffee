# The socket manager is just an event emitter class which 
# binds itself to our websocket / push implementation
# other areas of the application can bind to events on 
# the socket manager.
class SocketManager
  constructor: (provider, options)->
    _.extend @, Backbone.Events
    _.bindAll @, "relayer", "loadTransport", "transportLoaded"

    mgr = @

    mgr.provider = provider

  connect: ()->
    mgr = @

    try
      mgr.loadTransport()
    catch e
      App.util.disable_socket_features()

  #### Event Relaying
  #
  #
  #
  # the relayer can be passed by reference to any member of the now interface
  # which returns an array, the first member being the event name you would like
  # to trigger, and the last being the arguments you want to be passed to any
  # listener

  # example:
  #
  # on the clients
  #   now.callbackRunner(options, WMXApp.socket.relayer)
  #
  # on the server:
  #   callbackRunner: (options, callback)->
  #     callback( 'event-id', doSomething(options) )
  #
  # on the socket manager:
  #   triggers event event-id, with the arguments
  relayer: (event,args) =>
    @trigger event, args

  # gets fired when now.js is loaded
  transportLoaded: ()->
    @nowLoaded() if @provider is 'now'

  nowLoaded: ()->
    @trigger "ready"
    now.relayEvent = @relayer

    # expose a function for the nowjs interface to be
    # able to broadcast any publishable items
    # from the activity feed and have them show up in real time
    # in the activity feed
    now.broadcastActivity = (item)=> 
      WMXApp.feeds_store.add( JSON.parse(item) )

    App.util.enable_socket_features()

  # inject now js into the DOM 
  # manually instead of on page load
  # this way we can blanket disable it
  # in certain instances ( i.e. browser dependent )
  loadTransport: (provider)->
    @loadNow() if @provider is 'now'

  loadNow: ()->
    mgr = @

    script = document.createElement 'script'
    script.setAttribute "type", "text/javascript"
    script.setAttribute "src", "http://#{ AppHost }:8080/nowjs/now.js"
    script.onload = @transportLoaded

    if App.util.isIE()
      script.onreadystatechange = ()->
        if script.readyState is "loaded"
          mgr.transportLoaded()

    document.getElementsByTagName('head')[0].appendChild script

window.SocketManager = SocketManager
