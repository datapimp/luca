class Luca.CollectionManager
  name: "primary"

  __collections: {}

  relayEvents: true 

  constructor: (@options={})->
    _.extend @, @options

    manager = @

    if existing = Luca.CollectionManager.get?(@name)
      throw 'Attempt to create a collection manager with a name which already exists'

    @collectionNamespace ||= Luca.util.read( Luca.Collection.namespace )  
    
    Luca.CollectionManager.instances ||= {}

    _.extend @, Backbone.Events
    _.extend @, Luca.Events

    Luca.CollectionManager.instances[ @name ] = manager

    Luca.CollectionManager.get = (name)->
      return manager unless name?
      Luca.CollectionManager.instances[name]

    @state = new Luca.Model()

    if @initialCollections
      handleInitialCollections.call(@)

  add: (key, collection)->
    @currentScope()[ key ] ||= collection

  allCollections: ()->
    _( @currentScope() ).values()

  # create a collection from just a key.
  # if you pass the private option, it will
  # skip registering this collection
  create: (key, collectionOptions={}, initialModels=[])->
    CollectionClass = collectionOptions.base
    CollectionClass ||= guessCollectionClass.call(@, key)
    collectionOptions.name = "" if collectionOptions.private

    try  
      collection = new CollectionClass(initialModels,collectionOptions)
    catch e
      console.log "Error creating collection", CollectionClass, collectionOptions, key
      throw(e)

    @add(key, collection)

    collectionManager = @

    if @relayEvents is true
      @bind "*", ()->
        console.log "Relay Events on Collection Manager *", collection, arguments

    return collection

  currentScope: ()->
    if current_scope = @getScope()
      @__collections[ current_scope ] ||= {}
    else
      @__collections

  each: (fn)->
    _( @all() ).each(fn)

  get:(key)->
    @currentScope()[key]

  getScope: ()-> undefined

  destroy: (key)->
    c = @get(key)
    delete @currentScope()[key]
    c

  getOrCreate: (key,collectionOptions={},initialModels=[])->
    @get(key) || @create(key,collectionOptions,initialModels,false)

  collectionCountDidChange: ()->
    if @allCollectionsLoaded() 
      # for backwards compat
      @trigger "all_collections_loaded" 
      @trigger "initial:load"

  allCollectionsLoaded:()->
    @totalCollectionsCount() is @loadedCollectionsCount()

  totalCollectionsCount: ()->
    @state.get("collections_count")

  loadedCollectionsCount: ()->
    @state.get("loaded_collections_count")

  private: (key, collectionOptions={}, initialModels=[])->
    @create(key,collectionOptions,initialModels,true)

#### Helpers

Luca.CollectionManager.isRunning = ()->
  _.isEmpty( Luca.CollectionManager.instances ) isnt true

Luca.CollectionManager.destroyAll = ()-> 
  Luca.CollectionManager.instances = {} 

Luca.CollectionManager.loadCollectionsByName = (set, callback)->
  for name in set 
    collection = @getOrCreate(name)
    collection.once "reset", ()->
      callback(collection)
    collection.fetch()  

#### Private Methods
guessCollectionClass = (key)->
  classified = Luca.util.classify( key )

  if _.isString( @collectionNamespace )
    @collectionNamespace = Luca.util.resolve(@collectionNamespace)

  # support our naming convention of Books
  guess = (@collectionNamespace || (window || global) )[ classified ]

  # support naming covention like BooksCollection
  guess ||= (@collectionNamespace || (window || global) )[ "#{classified}Collection" ]

  if not guess? and Luca.Collection.namespaces?.length > 0
    guesses = _( Luca.Collection.namespaces.reverse() ).map (namespace)->
      Luca.util.resolve("#{ namespace }.#{ classified }") || Luca.util.resolve("#{ namespace }.#{ classified }Collection")

    guesses = _( guesses ).compact()

    guess = guesses[0] if guesses.length > 0

  guess

loadInitialCollections = ()->
  collectionDidLoad = (collection) =>
    current = @state.get("loaded_collections_count")
    @state.set("loaded_collections_count", current + 1)
    @trigger "collection_loaded", collection.name
    collection.unbind "reset"

  set = @initialCollections
  Luca.CollectionManager.loadCollectionsByName.call(@, set, collectionDidLoad)


handleInitialCollections = ()->
  @state.set({loaded_collections_count: 0, collections_count: @initialCollections.length })
  @state.bind "change:loaded_collections_count", ()=> @collectionCountDidChange()

  if @useProgressLoader
    @loaderView ||= new Luca.components.CollectionLoaderView(manager: @,name:"collection_loader_view")

  loadInitialCollections.call(@)

  @initialCollectionsLoadedu
  @
