#### Collection Manager
#
# The purpose of the collection manager is to provide an interface
# for tracking the creation of collections, so that you only create
# one instance of a given collection class per instance of some scope
#
# For example:

# LucaApp = Luca.containers.Viewport.extend
#  initialize: (@options={})->
#     @collectionManager = new Luca.CollectionManager
#       getScope: ()-> @someParentValue
#  collection: (key,options={},models=[])-> 
#    @collectionManager.getOrCreate(key,options,models)
#
# Now in the single global instance of LucaApp you have 
# one central place to access a collection of models, one
# interface to listen to for add, remove, reset, change events 
#
# If you don't want this, you can either do it the old fashioned way
# or just use the private option to get an unregistered instance.
#
#
#### View Event Binding Interface
#
# Luca.Views can specify a @collectionEvents property very similar to
# the DOM @events property in Backbone.Views and this provides a very
# clean API for binding to events on the collection manager and doing
# the necessary things on the view.  This does assume that by default
# there is only one instance of the collection manager running, otherwise
# a configuration directive is provided at a view level to know which
# collection manager to pull from.
#
# Special Thanks to @tjbladez for this wonderful initialModelsa
#

#### Automatic Registration
#
# In the Luca.Collection class, there are two configuration options
#
# @registerAs which is used to define a unique name for which to reference the collection

# @registerWith which is used to point to the instance of the collection manager
# this can be a string, in case the value doesn't exist yet, and luca will automatically
# find the object when it is time
#

class Luca.CollectionManager
  __collections: {}
  
  constructor: (@options={})->
    _.extend @, @options
    _.extend @, Backbone.Events

    # if you are going to use more than one collection
    # manager, then you will have to specify which 
    # collection manager your views need to interact
    # with for their collectionEvents configuration handling
    if Luca.CollectionManager.get
      console.log "A collection manager has already been created.  You are responsible for telling your views which to use"
    else
      Luca.CollectionManager.get = _.bind ()->
        return @
      , @ 


  add:(key, collection)->
    @currentScope()[ key ] = collection

  allCollections: ()->
    _( @currentScope() ).values() 
  
  # create a collection from just a key.    
  # if you pass the private option, it will
  # skip registering this collection
  create: (key, collectionOptions={}, initialModels=[], private=false)->
    CollectionClass = collectionOptions.base 
    CollectionClass ||= @guessCollectionClass(key)
    
    collectionOptions.registerWith = "" if private or collectionOptions.private

    collection = new CollectionClass(initialModels,collectionOptions)

    @add(key, collection)

    return collection

  #### Collection Prefix
  #
  # If you are doing things right, you are namespacing all of your collection
  # definitions, for example 
  # 
  # LucaApp.collections.SomeCollection = Luca.Collection.extend
  #   registerAs: "some_collection"
  #   registerWith: "" 
  #
  # You should override this attribute when you create or define your collection manager
  #
  # 
  collectionPrefix: Luca.Collection.namespace

  #### Collection Scopes

  # any time you create a collection, or use getOrCreate, the key
  # value ( @registerAs ) for your collection will be used to retrieve it
  # 
  # if you plan to have multiple instances per key, but with some sort of
  # scope based on a parent attribute, you should define a 
  currentScope: ()->
    if current_scope = @getScope()
      @__collections[ current_scope ] ||= {}
    else
      @__collections

  # do something to each collection in the scope
  each: (fn)->
    _( @all() ).each(fn)

  get:(key)->
    @currentScope()[key]

  # by default, we won't use a scope, but if you wish to use one
  # you should define this method on your collection manager
  getScope: ()-> undefined

  getOrCreate: (key,collectionOptions={},initialModels=[])->  
    @get(key) || @create(key,collectionOptions,initialModels,false)
  
  guessCollectionClass: (key)->
    classified = _( key ).chain().capitalize().camelize().value() 
    guess = (@collectionPrefix || window)[ classified ]
    
    guess

  # in most cases, the collections we use can be used only once
  # and any reset events should be respected, bound to, etc.  however
  # if this ever isn't the case, you can create an instance
  # of a collection which is "private" in that once it is 
  # returned from the collection manager, it isn't tracked so
  # you can make sure any add / reset / remove / filter events
  # don't effect other views
  private: (key, collectionOptions={}, initialModels=[])->
    @create(key,collectionOptions,initialModels,true) 
