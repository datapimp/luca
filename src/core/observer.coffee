class Luca.Observer
  constructor: (@options={})->
    _.extend @, Backbone.Events
    @type = @options.type

    if @options.debugAll
      @bind "event", (t, args...)=>
        console.log "Observed #{ @type } #{ (t.name || t.id || t.cid) }", t, _(args).flatten()

  relay: (triggerer, args...)->
    @trigger "event", triggerer, args
    @trigger "event:#{ args[0] }", triggerer, args.slice(1)

Luca.Observer.enableObservers = (options={})->
  Luca.enableGlobalObserver = true
  Luca.ViewObserver = new Luca.Observer _.extend(options, type:"view")
  Luca.CollectionObserver = new Luca.Observer _.extend(options, type:"collection")