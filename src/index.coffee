# #### Luca.js
# #
# # Luca is a Backbone Helper and Container View Library
# # which is packed with about a year worth of Backbone.js
# # experience and best practices accumulated while I developed
# # several large Backbone applications.  By using it, you are
# # to a degree accepting my way of doing things.  But, I can
# # assure you that by accepting my way of doing things you can
# # focus a lot more on developing your UI and features and less
# # on the boilerplate code required to get things to work properly.
# #
# # Luca components and stock Backbone components are completely
# # compatible and you can ( and should ) use both in your application
# # wherever it makes the most sense to do so

# #### ExtJS Component Style

# # Luca is inspired by the ExtJS style of laying out applications
# # as composite views with components nested within components, and
# # where the outer views or components handle communication between
# # their children.  By properly abstracting your views it becomes
# # possible to build large applications simply with a bunch of JSON
# # configuration parameters

# MyApplication = Luca.containers.Viewport.extend
#   components:[
#     ctype: 'column_view'
#     layout: '50/50'
#     components: [
#       ctype: 'card_view'
#       name: 'view1'
#       components:[
#         ctype: 'custom_view'
#         name: 'custom_view_1'
#       ,
#         ctype: 'custom_view'
#         name: 'custom_view_2'
#       ]
#     ,
#       ctype : 'custom_view'
#       name: 'custom_view_3'
#     ]
#   ]

# #### View Registry
# #
# # if You define your views in namespaces, like you should be
# App.views.CustomView = Luca.View.extend()
# App.views.OtherView = Luca.View.extend()

# # Then you can call Luca.registry.addNamespace 'App.views'
# # and then have views like CustomView be accessible by
# # a @ctype property with the value 'custom_view'
# # in the various container views provided by luca.  This style of
# # lazy instantiation adopted from ExtJS makes it possible to define
# # a view and its relationships but not necessarily create it until
# # you need it.  Or at the very least, to have the containers render
# # these components for you and inject them into their proper place
# # in the DOM structure

# Luca.registry.addNamespace 'App.views'

# #### View Helpers
# #
# # Luca.View is an extension of Backbone.View and provides some common
# # patterns that I have found useful in the most generic cases when developing
# # all different kinds of features in various kinds of apps.

# #### Auto Event Binding
# #
# # views can define a hooks attribute which prevent you from having to
# # bind to certain named triggers.  Hooks methods are automatically called
# # within the context of the view itself
#   Luca.View = Backbone.View.extend
#     ...
#     hooks:[
#       "before:render"
#       "after:render"
#     ]

#   SubClass = Luca.View.extend
#     beforeRender: ()->
#       @doSomething()
#     afterRender: ()->
#       @doSomething()

# # this is accomplished by the setupHooks method
# # which is automatically called on every Luca.View
# # subclass.  This allows you to just define which
# # methods on your view should be called any time an
# # event gets triggered
#   setupHooks: (set)->
#     set ||= @hooks

#     _(set).each (event)=>
#       parts = event.split(':')
#       prefix = parts.shift()

#       parts = _( parts ).map (p)-> _.capitalize(p)
#       fn = prefix + parts.join('')

#       @bind event, ()=> @[fn].apply @, arguments if @[fn]

# #### Collection Helpers
# #
# # Luca.Collection is an extenstion of Backbone.Collection which provides
# # a bunch of commonly used patterns for doing things like:
# #

# #   - setting base parameters used on every request to your REST API
# Luca.Collection.baseParams = (obj)->
#   return Luca.Collection._baseParams = obj if obj

#   if _.isFunction( Luca.Collection._baseParams )
#     return Luca.Collection._baseParams.call()

#   if _.isObject( Luca.Collection._baseParams )
#     Luca.Collection._baseParams

# #
# #   - filtering with query string parameters against your API
# #
# #   - automatic interaction with your Luca.CollectionManager class

#   register: (collectionManager="", key="", collection)->
#     ...
#     collection ||= this
#     ...
#     if _.isString( collectionManager )
#       collectionManager = Luca.util.nestedValue( collectionManager, window )

#     if _.isFunction( collectionManager.add )
#       return collectionManager.add(key, collection)

#     if _.isObject( collect)
#       collectionManager[ key ] = collection

# #   - make it easier to parse Rails style responses which include the root
# #     by specifying a @root parameter
# #
# #   - use backbone-query if available
# #
# #   - onceLoaded: run a callback once if there are models present, otherwise wait until
# #     the collection fetches
#   onceLoaded: (fn)->
#     ...
#     wrapped = ()=> fn.apply @,[@]

#     @bind "reset", ()=>
#       wrapped()
#       @unbind "reset", wrapped
#     ...
# #   - ifLoaded: run a callback any time the model gets reset, or if there are already models
#   ifLoaded: (fn, scope=@)->
#     ...
#     @bind "reset", (collection)=>
#       fn.apply scope, [collection]
#     ...
#     unless @fetching
#       @fetch()


# #   - bootstrapping a collection of objects which are
# #     rendered in your markup on page load

# #### Collections with Bootstrapped Models
# #
# # In order to make our Backbone Apps super fast it is a good practice
# # to pre-populate your collections by what is referred to as bootstrapping
# #
# # Luca.Collections make it easier for you to do this cleanly and automatically
# #
# # by specifying a @cached property or method in your collection definition
# # Luca.Collections will automatically look in this space to find models
# # and avoid a roundtrip to your API unless explicitly told to.
# Luca.Collection._bootstrapped_models = {}

# Luca.Collection.bootstrap = (obj)->
#   _.extend Luca.Collection._bootstrapped_models, obj

# Luca.Collection.cache = (key, models)->
#   return Luca.Collection._bootstrapped_models[ key ] = models if models
#   Luca.Collection._bootstrapped_models[ key ] || []

# Luca.Collection = Backbone.Collection.extend
#   ...
#   fetch: (options={})->
#     @trigger "before:fetch", @

#     return @reset(@data) if @memoryCollection is true

#     # fetch will try to pull from the bootstrap if it is setup to do so
#     # you can actually make the roundtrip to the server anyway if you pass
#     # refresh = true in the options hash
#     return @bootstrap() if @cached_models().length and not options.refresh


# #### Collection Manager
# #
# # The purpose of the collection manager is to provide an interface
# # for tracking the creation of collections, so that you only create
# # one instance of a given collection class per instance of some scope.

# class Luca.CollectionManager
#   ...
#   getOrCreate: (key,collectionOptions={},initialModels=[])->
#     @get(key) || @create(key,collectionOptions,initialModels)

#   # If you use a underscored version of your collection class name
#   # as the key for your collection ( defined via @registerAs ) then
#   # it will automatically be able to guess which collection you are
#   # referring to and create it for you
#   guessCollectionClass: (key)->
#     classified = _( key ).chain().capitalize().camelize().value()
#     guess = (@collectionPrefix || window)[ classified ]

# # You would generally create the collection manager once as part of
# # your global application object which, in my opinion should be a
# # Luca Viewport container

# LucaApp = Luca.containers.Viewport.extend
#   initialize: (@options={})->
#     @collectionManager = new Luca.CollectionManager
#       getScope: ()=> @someParentValue()

#   collection: (key,options={},models=[])->
#     @collectionManager.getOrCreate(key,options,models)

#   someParentValue: ()-> @usedToScopeTheCollections

# # Now in the single global instance of LucaApp you have
# # one central place to access a collection of models, one
# # interface to listen to for add, remove, reset, change events

# #### Collection and View Integration

# # One really cool feature of Luca is the enhanced API for binding
# # collections to views.  Using an API very similar to the
# # DOM @events property on Backbone views.  If you are using Luca.Collection
# # classes and a Luca.CollectionManager to track them, you can use the
# # @collectionEvents property on your views as a cleaner interface for
# # setting up your event bindings

# App.Manager = new Luca.CollectionManager()

# App.SampleCollection = new Luca.SampleCollection
#   registerWith: "App.Manager"
#   registerAs: "sample_collection"

# App.View = Luca.View.extend
#   collectionEvents:
#     "sample_collection add" : "onCollectionAdd"

#   onCollectionAdd: (model,collection)->
#     @doSomethingRighteous()
