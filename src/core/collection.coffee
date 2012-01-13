Luca.Collection = Backbone.Collection.extend
  base: 'Luca.Collection'

Luca.Collection._baseParams = {}
Luca.Collection.baseParams = (obj)->
  return Luca.Collection._baseParams = obj if obj

  if _.isFunction( Luca.Collection._baseParams )
    return Luca.Collection._baseParams.call()
  
  if _.isObject( Luca.Collection._baseParams )
    Luca.Collection._baseParams

Luca.Collection._models_cache = {}

Luca.Collection.bootstrap = (obj)->
  _.extend Luca.Collection._models_cache, obj

Luca.Collection.cache = (key, models)->
  return Luca.Collection._models_cache[ key ] = models if models
  Luca.Collection._models_cache[ key ] || []

_.extend Luca.Collection.prototype,
  initialize: (models, @options={})->
    _.extend @, @options

    if @cached
      @model_cache_key = if _.isFunction( @cached ) then @cached() else @cached  
    
    if _.isArray(@data) and @data.length > 0
      @local = true

    Backbone.Collection.prototype.initialize.apply @, [models, @options] 

  load_from_cache: ()->
    return unless @model_cache_key
    @reset @cached_models()

  cached_models: ()->
    Luca.Collection.cache( @model_cache_key )

  fetch: (options={})->
    @trigger "before:fetch", @
    return @reset(@data) if @local is true
    
    return @load_from_cache() if @cached_models().length and not options.refresh

    @fetching = true

    url = if _.isFunction(@url) then @url() else @url

    return true unless url and url.length > 1

    try
      Backbone.Collection.prototype.fetch.apply @, arguments
    catch e
      console.log "Error in Collection.fetch", e

  ifLoaded: (fn, scope=@)->
    if @models.length > 0 and not @fetching
      fn.apply scope, [@]
      return

    @bind "reset", (collection)=>
      fn.apply scope, [collection]

    unless @fetching
      @fetch()

  parse: (response)-> 
    if @root? then response[ @root ] else response
