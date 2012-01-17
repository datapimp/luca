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
    
       # if we are to register with some global collection management system
    if @registerWith
      @registerAs ||= @cached
      @registerAs = if _.isFunction( @registerAs ) then @registerAs() else @registerAs

      @bind "before:fetch", ()=>
        @register( @registerWith, key, @)
 
    if _.isArray(@data) and @data.length > 0
      @local = true

    Backbone.Collection.prototype.initialize.apply @, [models, @options] 
  
  # Collection Manager Registry
  #
  # If this collection is to be registered with some global collection
  # tracker, such as App.collections, then we will register ourselves
  # with this registry, by storing ourselves with a key
  #
  # To automatically register a collection with the registry, instantiate
  # it with the registerWith property, which can either be a reference to
  # the manager itself, or a string in case the manager isn't available
  # at compile time
  register: (collectionManager, key, collection)->
    if _.isString( collectionManager )
      collectionManager = Luca.util.nestedValue( collectionManager, window )

    collectionManager[ key ] = collection

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
    @trigger "after:response"
    if @root? then response[ @root ] else response
