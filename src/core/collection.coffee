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

  # cachedMethods refers to a list of methods on the collection
  # whose value gets cached once it is ran.  the collection then
  # binds to change, add, remove, and reset events and then expires
  # the cached value once these events are fired.

  # cachedMethods expects an array of strings representing the method name
  # or objects containing @method and @resetEvents properties.  by default
  # @resetEvents are 'add','remove',reset' and 'change'.
  cachedMethods: []

  restoreMethodCache: ()->
    for name, config of @_methodCache
      if config.original?
        config.args = undefined
        @[ name ] = config.original

  clearMethodCache: ()->
    for name, config of @_methodCache
      oldValue = config.value
      config.value = undefined

  setupMethodCaching: ()->
    collection = @
    resetEvents = ["reset","change","add","remove"]

    cache = @_methodCache = {}

    _( @cachedMethods ).each (method)->
      # store a reference to the unwrapped version of the method
      # and a placeholder for the cached value
      cache[ method ] =
        name: method
        original: collection[method]
        value: undefined

      # wrap the collection method with a basic memoize operation
      collection[ method ] = ()->
        cache[method].value ||= cache[method].original.apply(collection)

      # bind to events on the collection, which once triggered, will
      # invalidate the cached value.  causing us to have to restore it
      for resetEvent in resetEvents
        collection.bind resetEvent, ()->
          collection.clearMethodCache()


  initialize: (models=[], @options)->
    _.extend @, @options

    @setupMethodCaching()

    @_reset()

    # By specifying a @cache_key property or method, you can instruct
    # Luca.Collection instances where to pull an array of model attributes
    # usually done with the bootstrap functionality provided.

    # DEPRECATION NOTICE
    if @cached and _.isString( @cached )
      console.log 'The @cached property of Luca.Collection is being deprecated.  Please change to cache_key'

    # TODO
    # Change this from cached to cache_key
    if @cache_key ||= @cached
      @bootstrap_cache_key = if _.isFunction( @cache_key ) then @cache_key() else @cache_key

    if @registerAs or @registerWith
      console.log "This configuration API is deprecated.  use @name and @manager properties instead"

    # support the older configuration API
    @name ||= @registerAs
    @manager ||= @registerWith

    # if they specify a
    if @name and not @manager
      @manager = Luca.CollectionManager.get()

    # If we are going to be registering this collection with the CollectionManager
    # class, then we need to specify a key to register ourselves under. @registerAs can be
    # as simple as something as "books", or if you are using collections which need
    # to be scoped with some sort of unique id, as say some sort of belongsTo relationship
    # then you can specify @registerAs as a method()
    if @manager
      @name ||= @cached()
      @name = if _.isFunction( @name ) then @name() else @name

      unless @private or @anonymous
        @bind "after:initialize", ()=>
          @register( @manager, @name, @)

    # by passing useLocalStorage = true to your collection definition
    # you will bypass the RESTful persistence layer and just persist everything
    # locally in localStorage
    if @useLocalStorage is true and window.localStorage?
      table = @bootstrap_cache_key || @name
      throw "Must specify either a cached or registerAs property to use localStorage"
      @localStorage = new Luca.LocalStore( table )

    # Populating a collection with local data
    #
    # by specifying a @data property which is an array
    # then you can set the collection to be a @memoryCollection
    # which never interacts with a persistence layer at all.
    #
    # this is mainly used by the Luca.fields.SelectField class for
    # generating simple select fields with static data
    if _.isArray(@data) and @data.length > 0
      @memoryCollection = true

    @__wrapUrl() unless @useNormalUrl is true

    Backbone.Collection::initialize.apply @, [models, @options]

    if models
      @reset models, silent: true, parse: options?.parse

    @trigger "after:initialize"

  #### Automatic Query String Generation
  #
  # Luca.Collections will append a query string to the URL
  # and will automatically do this for you without you having
  # to write a special url handler.  If you want to use a normal
  # url without this feature, just set @useNormalUrl = true
  __wrapUrl: ()->
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

  # Applying a filter to a collection, will automatically apply
  # the filter parameters and then call fetch.  passing an additional
  # options hash will pass these options to the call to @fetch()
  # setting refresh to true, forcing a remote call to the REST API
  applyFilter: (filter={}, options={})->
    @applyParams(filter)
    @fetch _.extend(options,refresh:true)

  # You can apply params to a collection, so that any upcoming requests
  # made to the REST API are made with the key values specified
  applyParams: (params)->
    @base_params ||= _( Luca.Collection.baseParams() ).clone()
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
  register: (collectionManager=Luca.CollectionManager.get(), key="", collection)->
    throw "Can not register with a collection manager without a key" unless key.length >= 1
    throw "Can not register with a collection manager without a valid collection manager" unless collectionManager?

    # by passing a string instead of a reference to an object, we can look up
    # that object only when necessary.  this prevents us from having to create
    # the manager instance before we can define our collections
    if _.isString( collectionManager )
      collectionManager = Luca.util.nestedValue( collectionManager, (window || global) )

    throw "Could not register with collection manager" unless collectionManager

    if _.isFunction( collectionManager.add )
      return collectionManager.add(key, collection)

    if _.isObject( collectionManager )
      collectionManager[ key ] = collection

  # A Luca.Collection will load models from the in memory model store
  # returned from Luca.Collection.cache, where the key returned from
  # the @cached attribute or method matches the key of the model cache
  loadFromBootstrap: ()->
    return unless @bootstrap_cache_key
    @reset @cached_models()
    @trigger "bootstrapped", @

  # an alias for loadFromBootstrap which is a bit more descriptive
  bootstrap: ()->
    @loadFromBootstrap()

  # cached_models is a reference to the Luca.Collection.cache object
  # key'd on whatever this collection's bootstrap_cache_key is set to be
  # via the @cached() interface
  cached_models: ()->
    Luca.Collection.cache( @bootstrap_cache_key )

  # Luca.Collection overrides the default Backbone.Collection.fetch method
  # and triggers an event "before:fetch" which gives you additional control
  # over the process
  #
  # in addition, it loads models directly from the bootstrap cache instead
  # of going directly to the API
  fetch: (options={})->
    @trigger "before:fetch", @

    return @reset(@data) if @memoryCollection is true

    # fetch will try to pull from the bootstrap if it is setup to do so
    # you can actually make the roundtrip to the server anyway if you pass
    # refresh = true in the options hash
    return @bootstrap() if @cached_models().length and not options.refresh

    url = if _.isFunction(@url) then @url() else @url

    return true unless ((url and url.length > 1) or @localStorage)

    @fetching = true

    try
      Backbone.Collection.prototype.fetch.apply @, arguments
    catch e
      console.log "Error in Collection.fetch", e

      throw e

  # onceLoaded is equivalent to binding to the
  # reset trigger with a function wrapped in _.once
  # so that it only gets run...ahem...once.
  #
  # that being said, if the collection already has models
  # it won't even bother fetching it it will just run
  # as if reset was already triggered
  onceLoaded: (fn, options={autoFetch:true})->
    if @length > 0 and not @fetching
      fn.apply @, [@]
      return

    wrapped = ()=> fn.apply @,[@]

    @bind "reset", ()->
      wrapped()
      @unbind "reset", @

    unless @fetching or not options.autoFetch
      @fetch()

  # ifLoaded is equivalent to binding to the reset trigger with
  # a function, if the collection already has models it will just
  # run automatically.  similar to onceLoaded except the binding
  # stays in place
  ifLoaded: (fn, options={scope:@,autoFetch:true})->
    scope = options.scope || @

    if @length > 0 and not @fetching
      fn.apply scope, [@]

    @bind "reset", (collection)=> fn.apply scope, [collection]

    unless @fetching is true or !options.autoFetch or @length > 0
      @fetch()

  # parse is very close to the stock Backbone.Collection parse, which
  # just returns the response.  However, it also triggers a callback
  # after:response, and automatically parses responses which contain
  # a JSON root like you would see in rails, if you specify the @root
  # property.
  #
  # it will also update the Luca.Collection.cache with the models from
  # the response, so that any subsequent calls to fetch() on a bootstrapped
  # collection, will have updated models from the server.  Really only
  # useful if you call fetch(refresh:true) manually on any bootstrapped
  # collection
  parse: (response)->
    @fetching = false
    @trigger "after:response", response
    models = if @root? then response[ @root ] else response

    if @bootstrap_cache_key
      Luca.Collection.cache( @bootstrap_cache_key, models)

    models


# Global Collection Observer
_.extend Luca.Collection.prototype,
  trigger: ()->
    if Luca.enableGlobalObserver
      Luca.CollectionObserver ||= new Luca.Observer(type:"collection")
      Luca.CollectionObserver.relay(@, arguments)

    Backbone.View.prototype.trigger.apply @, arguments

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