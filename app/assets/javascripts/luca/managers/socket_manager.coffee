# The SocketManager provides communication between a Websocket / Pubsub
# system and routes messages through the application to instances
# of a specific view, model, collection, or other Backbone.Events object. 
#
# You will need to create the socket manager specifying your provider and host:
#       @socket = new Luca.SocketManager(host:"//localhost:9292/faye")
#
socketManager = Luca.register "Luca.SocketManager"
socketManager.extends         "Luca.Model"

socketManager.defines
  # The SocketManager can be configured with the following options:
  #
  # autoStart: default(true) immediately begins to load the provider
  # script, setup the connection, etc
  #
  # provider: faye.js or socket.io
  defaults:
    autoStart: true  
    providerAvailable: false
    ready: false
    provider: "faye.js"

  initialize: (@attributes={})->
    unless @providerLibraryIsAvailable()
      @loadProviderSource() 

    Luca.Model::initialize?.apply(@, arguments)

    model = @

    connectOnReady = ()=> 
      @connect() if @isReady()

    model.on "change:ready", ()->
      connectOnReady()
      model.unbind("change:ready", @)

    model.on "change:providerAvailable", ()->
      connectOnReady()
      model.unbind("change:ready", @)

    @on "ready", _.once ()=> @set('ready', true)

    @trigger "change"

  # The socket manager is ready once 'ready' event has been
  # triggered on it.  ( usually by the application ). and once
  # the provider client library as been loaded.
  isReady: ()->
    @get("ready") is true and @get("providerAvailable") is true

  providerLibraryIsAvailable: ()->
    providerTest = switch @get('provider')
      when "socket.io"
        "io"
      when "faye.js"
        "Faye.Client"

    !!(Luca.util.resolve(providerTest)?)

  connect: ()->
    switch @get('provider')
      when "socket.io"
        @client = io.connect( @get('host') )
      when "faye.js"
        @client = new Faye.Client(@get('host'))
        @set("client", @client)

  providerSourceLoaded: ()-> 
    @set "providerAvailable", true

  providerSourceUrl: ()->
    return Luca.config.socketManagerProviderScript if Luca.config.socketManagerProviderScript?
    
    switch @get('provider')
      when "socket.io" then "#{  @get('host')  }/socket.io/socket.io.js"
      when "faye.js" then "#{  @get('host')  }/faye.js"

  loadProviderSource: ()->
