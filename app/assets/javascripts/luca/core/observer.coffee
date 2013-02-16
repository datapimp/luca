class Luca.Observer
  constructor: (@options={})->
    _.extend @, Backbone.Events
    @type = @options.type

    if @options.debugAll
      @bind "all", (trigger, one, two)=>
        console.log "ALL", trigger, one, two
  relay: (triggerer, args...)->
    console.log "Relaying", trigger, args
    @trigger "event", triggerer, args
    @trigger "event:#{ args[0] }", triggerer, args.slice(1)

Luca.Observer.enableObservers = (options={})->
  Luca.enableGlobalObserver = true
  Luca.ViewObserver = new Luca.Observer _.extend(options, type:"view")
  Luca.CollectionObserver = new Luca.Observer _.extend(options, type:"collection")