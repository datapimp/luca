class Luca.CollectionManager
  name: "primary"

  __collections: {}

  constructor: (@options={})->
    _.extend @, @options

    manager = @

    if existing = Luca.CollectionManager.get?(@name)
      throw 'Attempt to create a collection manager with a name which already exists'

    Luca.CollectionManager.instances ||= {}

    _.extend @, Backbone.Events
    _.extend @, Luca.Events

    Luca.CollectionManager.instances[ @name ] = manager

    Luca.CollectionManager.get = (name)->
      return manager unless name?
      Luca.CollectionManager.instances[name]

    @state = new Luca.Model()

    if @initialCollections
      @state.set({loaded_collections_count: 0, collections_count: @initialCollections.length })
      @state.bind "change:loaded_collections_count", @collectionCountDidChange

      if @useProgressLoader
        @loaderView ||= new Luca.components.CollectionLoaderView(manager: @,name:"collection_loader_view")

      @loadInitialCollections()

    @

  add: (key, collection)->
    @currentScope()[ key ] ||= collection

  allCollections: ()->
    _( @currentScope() ).values()

  # create a collection from just a key.
  # if you pass the private option, it will
  # skip registering this collection
  create: (key, collectionOptions={}, initialModels=[])->
    CollectionClass = collectionOptions.base
    CollectionClass ||= @guessCollectionClass(key)
    collectionOptions.name = "" if collectionOptions.private

    collection = new CollectionClass(initialModels,collectionOptions)

    @add(key, collection)

    return collection


  collectionNamespace: Luca.Collection.namespace

 
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

  getOrCreate: (key,collectionOptions={},initialModels=[])->
    @get(key) || @create(key,collectionOptions,initialModels,false)

  guessCollectionClass: (key)->
    classified = Luca.util.classify( key )
    guess = (@collectionNamespace || (window || global) )[ classified ]
    guess ||= (@collectionNamespace || (window || global) )[ "#{classified}Collection" ]
    guess

  loadInitialCollections: ()->
    collectionDidLoad = (collection) =>
      collection.unbind "reset"
      @trigger "collection_loaded", collection.name

    _(@initialCollections).each (name) =>
      collection = @getOrCreate(name)
      collection.bind "reset", ()->
        collectionDidLoad(collection)
      collection.fetch()

  collectionCountDidChange: ()->
    @trigger "all_collections_loaded" if @totalCollectionsCount() == @loadedCollectionsCount()

  totalCollectionsCount: ()->
    @state.get("collections_count")

  loadedCollectionsCount: ()->
    @state.get("loaded_collections_count")

  private: (key, collectionOptions={}, initialModels=[])->
    @create(key,collectionOptions,initialModels,true)

Luca.CollectionManager.destroyAll = ()-> 
  Luca.CollectionManager.instances = {} 
