class Luca.ScriptLoader
  @loaded: {}

  constructor: (options={})->
    _.extend(@, Backbone.Events, Luca.Events)
    @autoStart = options.autoStart is true
    @scripts = options.scripts

    ready = ()-> @trigger("ready")

    @ready = _.after( @scripts.length, ready)

    _.bindAll @, "load", "ready"

    @defer("load").until(@, "start")

    if @autoStart is true
      @trigger("start")

    @bind "ready", @onReady

  applyPrefix: (script)->
    script

  onReady: ()->
    console.log "All dependencies loaded"

  start: ()->
    @trigger("start")

  load: ()->
    Luca.util.loadScript( @applyPrefix(script), @ready ) for script in @scripts
