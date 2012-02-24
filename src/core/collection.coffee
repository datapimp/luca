# Luca.Collection
#
# Luca.Collection is an extenstion of Backbone.Collection which provides
# a bunch of commonly used patterns for doing things like:
#
#   - setting base parameters used on every request to your REST API
#
#   - bootstrapping a collection of objects which are 
#     rendered in your markup on page load
#
#   - filtering with query string parameters against your API
#
#   - automatic interaction with your Luca.CollectionManager class
#
#   - make it easier to parse Rails style responses which include the root
#     by specifying a @root parameter
#
#   - use backbone-query if available
#
#   - onceLoaded: run a callback once if there are models present, otherwise wait until
#     the collection fetches
#
#   - ifLoaded: run a callback any time the model gets reset, or if there are already models
#
Luca.Collection = (Backbone.QueryCollection || Backbone.Collection).extend
  
  initialize: (models, @options={})->
    _.extend @, @options

    # By specifying a @cached property or method, you can instruct
    # Luca.Collection instances where to pull an array of model attributes
    # usually done with the bootstrap functionality provided.
    if @cached
      @bootstrap_cache_key = if _.isFunction( @cached ) then @cached() else @cached  

    # if we are to register with some global collection management system
    if @registerWith
      @registerAs ||= @cached
      @registerAs = if _.isFunction( @registerAs ) then @registerAs() else @registerAs

      @bind "after:initialize", ()=>
        @register( @registerWith, @registerAs, @)
 
    if _.isArray(@data) and @data.length > 0
      @local = true
    
    @wrapUrl()
     
    Backbone.Collection.prototype.initialize.apply @, [models, @options] 

    @trigger "after:initialize"
  
  wrapUrl: ()->
    if _.isFunction(@url)
      @url = _.wrap @url, (fn)=>
        val = fn.apply @ 
        parts = val.split('?')

        existing_params = _.last(parts) if parts.length > 1

        queryString = @queryString()
        
        if existing_params and val.match(existing_params)
          queryString = queryString.replace( existing_params, '')

        new_val = "#{ val }?#{ queryString }"
        new_val = new_val.replace(/\?$/,'') if new_val.match(/\?$/)

        new_val
    else
      url = @url
      params = @queryString()
      
      @url = _([url,params]).compact().join("?")  

  queryString: ()->
    parts = _( @base_params ||= Luca.Collection.baseParams() ).inject (memo, value, key)=>
      str = "#{ key }=#{ value }"
      memo.push(str)
      memo
    , [] 

    _.uniq(parts).join("&")

  resetFilter: ()->
    @base_params = Luca.Collection.baseParams()
    @

  applyFilter: (filter={}, options={auto:true,refresh:true})->
    @applyParams(filter)
    @fetch(refresh:options.refresh) if options.auto
  
  applyParams: (params)->
    @base_params ||= Luca.Collection.baseParams()
    _.extend @base_params, params

  # Collection Manager Registry
  #
  # If this collection is to be registered with some global collection
  # tracker such as new Luca.CollectionManager() then we will register 
  # ourselves automatically
  #
  # To automatically register a collection with the registry, instantiate
  # it with the registerWith property, which can either be a reference to
  # the manager itself, or a string in case the manager isn't available
  # at compile time
  register: (collectionManager="", key="", collection)->
    
    throw "Can not register with a collection manager without a key" unless key.length > 1
    throw "Can not register with a collection manager without a valid collection manager" unless collectionManager.length > 1

    if _.isString( collectionManager )
      collectionManager = Luca.util.nestedValue( collectionManager, window )
      
    throw "Could not register with collection manager" unless collectionManager 
    
    if _.isFunction( collectionManager.add )
      return collectionManager.add(key, collection)

    if _.isObject( collect)
      collectionManager[ key ] = collection
  
  # an alias for loadFromBootstrap which is a bit more descriptive
  bootstrap: ()-> @loadFromBootstrap()

  loadFromBootstrap: ()->
    return unless @bootstrap_cache_key
    @reset @cached_models()

  cached_models: ()->
    Luca.Collection.cache( @bootstrap_cache_key )

  fetch: (options={})->
    @trigger "before:fetch", @

    return @reset(@data) if @local is true
    
    return @bootstrap() if @cached_models().length and not options.refresh
    
    @reset()

    @fetching = true

    url = if _.isFunction(@url) then @url() else @url
    
    return true unless ((url and url.length > 1) or @localStorage)

    try
      Backbone.Collection.prototype.fetch.apply @, arguments
    catch e
      console.log "Error in Collection.fetch", e
      
      throw e

  onceLoaded: (fn)->
    if @length > 0 and not @fetching
      fn.apply @, [@]
      return
    
    wrapped = ()=> fn.apply @,[@]

    @bind "reset", ()=>
      wrapped()
      @unbind "reset", wrapped
    
  ifLoaded: (fn, scope=@)->
    if @models.length > 0 and not @fetching
      fn.apply scope, [@]
      return

    @bind "reset", (collection)=>
      fn.apply scope, [collection]

    unless @fetching
      @fetch()

  parse: (response)-> 
    @fetching = false
    @trigger "after:response"
    models = if @root? then response[ @root ] else response
    
    if @bootstrap_cache_key
      Luca.Collection.cache( @bootstrap_cache_keys, models)

    models

#### Base Parameters
#
# Always include these parameters in every request to your REST API.
#
# either specify a function which returns a hash, or just a normal hash 
Luca.Collection.baseParams = (obj)->
  return Luca.Collection._baseParams = obj if obj

  if _.isFunction( Luca.Collection._baseParams )
    return Luca.Collection._baseParams.call()
  
  if _.isObject( Luca.Collection._baseParams )
    Luca.Collection._baseParams

#### Bootstrapped Models ( stuff loaded on page load )
#
# In order to make our Backbone Apps super fast it is a good practice
# to pre-populate your collections by what is referred to as bootstrapping
#
# Luca.Collections make it easier for you to do this cleanly and automatically
# 
# by specifying a @cached property or method in your collection definition
# Luca.Collections will automatically look in this space to find models
# and avoid a roundtrip to your API unless explicitly told to.
Luca.Collection._bootstrapped_models = {}

# In order to do this, just load an object whose keys
Luca.Collection.bootstrap = (obj)->
  _.extend Luca.Collection._bootstrapped_models, obj

# Lookup cached() or bootstrappable models.  This is used by the
# augmented version of Backbone.Collection.fetch() in order to avoid
# roundtrips to the API
Luca.Collection.cache = (key, models)->
  return Luca.Collection._bootstrapped_models[ key ] = models if models
  Luca.Collection._bootstrapped_models[ key ] || []