# The SocketManager provides communication between a Websocket / Pubsub
# system and routes messages through the application to instances
# of the 
class Luca.SocketManager extends Luca.Model
  defaults:
    autoStart: true  
    providerAvailable: false
    ready: false
    provider: "faye.js"

  initialize: (@attributes={})->
    @loadProviderSource() unless @providerAvailable() is true

    Luca.Model::initialize?.apply(@, arguments)

    model = @

    connectOnReady = ()=> @connect() if @isReady()

    model.on "change", ()->
      connectOnReady()
      model.unbind("change", @)

    @on "ready", _.once ()=> @set('ready', true)

    @trigger "change"

  isReady: ()->
    @get("ready") is true and @get("providerAvailable") is true

  providerAvailable: ()->
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
        @client = new Faye.Client( @get('host')  + ( @get('namespace')  || "") )

  providerSourceLoaded: ()-> 
    @set "providerAvailable", true

  providerSourceUrl: ()->
    switch @get('provider')
      when "socket.io" then "#{  @get('host')  }/socket.io/socket.io.js"
      when "faye.js" then "#{  @get('host')  }/faye.js"

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
