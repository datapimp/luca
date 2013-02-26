lucaUtilityHelper = (payload, args...)->
  if arguments.length is 0 
    return _( Luca.Application.instances ).values()?[0]

  if _.isString(payload) and result = Luca.cache(payload)
    return result

  if _.isString(payload) and result = Luca.find(payload)
    return result

  if _.isString(payload) and result = Luca.registry.find(payload)
    return result

  if payload instanceof jQuery and result = Luca.find(payload)
    return result

  if _.isObject(payload) and payload.ctype?
    return Luca.util.lazyComponent( payload )

  if _.isFunction( fallback = _(args).last() )
    return fallback()

(window || global).Luca = ()-> lucaUtilityHelper.apply(@, arguments)

_.extend Luca,
  core: {}
  collections: {}
  containers: {}
  components: {}
  models: {}
  concerns: {}
  util: {}
  fields: {}
  registry:{}
  options: {}
  config: {}
  logger: (trackerMessage)->
    (args...)->
      args.unshift( trackerMessage )
      console.log(@, args)

  getHelper: ()->
    ()-> lucaUtilityHelper.apply(@, arguments)

# for triggering / binding to component definitions
_.extend Luca, Backbone.Events

Luca.setupCollectionSpace = (options={})->
  {baseParams, modelBootstrap} = options

  if baseParams? 
    Luca.Collection.baseParams( baseParams )
  else
    Luca.warn('You should remember to set the base params for Luca.Collection class.  You can do this by defining a property or function on Luca.config.baseParams')

  if modelBootstrap?
    Luca.Collection.bootstrap( modelBootstrap )
  else
    Luca.warn("You should remember to set the model bootstrap location for Luca.Collection.  You can do this by defining a property or function on Luca.config.modelBootstrap")

# Creates a basic Namespace for you to begin defining
# your application and all of its components.
Luca.initialize = (namespace, options={})->
  Luca.namespace = namespace.toLowerCase()
  existing       = Luca.util.resolve(namespace, window || global) || {}

  _.defaults existing,
    views: {}
    collections: {}
    models: {}
    components: {}
    lib: {}
    util: {}
    concerns: {}
    register: ()->
      Luca.register.apply(@, arguments)
    onReady: ()-> 
      Luca.onReady.apply(@, arguments)
    getApplication: ()->
      Luca.getApplication?.apply(@, arguments)
    getCollectionManager: ()->
      Luca.CollectionManager.get?.apply(@, arguments)
    route: Luca.routeHelper


  object = {}
  object[ namespace ] = _.defaults(Luca.getHelper(), existing)

  _.extend(Luca.config, options)
  _.extend (window || global), object

  Luca.lastNamespace = namespace
  Luca.concern.namespace "#{ namespace }.concerns"
  Luca.registry.namespace "#{ namespace }.views"
  Luca.Collection.namespace "#{ namespace }.collections"

  Luca.on "ready", ()->
    Luca.setupCollectionSpace(options)

Luca.onReady = (callback)->
  Luca.define.close()
  Luca.trigger("ready")

  $ -> callback.apply(@, arguments)

Luca.find = (el)->
  Luca( $(el).data('luca-id') )

Luca.supportsEvents = Luca.supportsBackboneEvents = (obj)->
  Luca.isComponent(obj) or (_.isFunction( obj?.trigger ) or _.isFunction(obj?.bind))

Luca.isComponent = (obj)->
  Luca.isBackboneModel(obj) or Luca.isBackboneView(obj) or Luca.isBackboneCollection(obj)

Luca.isComponentPrototype = (obj)->
  Luca.isViewPrototype(obj) or Luca.isModelPrototype(obj) or Luca.isCollectionPrototype(obj)

Luca.isBackboneModel = (obj)->
  obj = Luca.util.resolve(obj) if _.isString(obj)
  _.isFunction(obj?.set) and _.isFunction(obj?.get) and _.isObject(obj?.attributes)

Luca.isBackboneView = (obj)->
  obj = Luca.util.resolve(obj) if _.isString(obj)
  _.isFunction(obj?.render) and !_.isUndefined(obj?.el)

Luca.isBackboneCollection = (obj)->
  obj = Luca.util.resolve(obj) if _.isString(obj)
  _.isFunction(obj?.fetch) and _.isFunction(obj?.reset)

Luca.isViewPrototype = (obj)->
  obj = Luca.util.resolve(obj) if _.isString(obj)
  obj? and obj::? and obj::make? and obj::$? and obj::render?

Luca.isModelPrototype = (obj)->
  obj = Luca.util.resolve(obj) if _.isString(obj)
  obj? and obj::? obj::save? and obj::changedAttributes?

Luca.isCollectionPrototype = (obj)->
  obj = Luca.util.resolve(obj) if _.isString(obj)
  obj? and obj::? and !Luca.isModelPrototype(obj) and obj::reset? and obj::select? and obj::reject?

Luca.inheritanceChain = (obj)->
  Luca.parentClasses(obj)

Luca.parentClasses = (obj)->
  list = []

  if _.isString(obj)
    obj = Luca.util.resolve(obj)

  metaData = obj.componentMetaData?()
  metaData ||= obj::componentMetaData?()

  list = metaData?.classHierarchy() || [obj.displayName || obj::displayName]

Luca.parentClass = (obj, resolve=true)->
  if _.isString( obj )
    obj = Luca.util.resolve(obj)

  parent = obj.componentMetaData?()?.meta["super class name"]
  parent ||= obj::componentMetaData?()?.meta["super class name"]

  parent || obj.displayName || obj.prototype?.displayName

  if resolve then Luca.util.resolve(parent) else parent


UnderscoreExtensions =
  module: (base,module)->
    _.extend base, module
    if base.included and _(base.included).isFunction()
      base.included.apply(base)

  delete: (object, key)->
    value = object[key]
    delete object[key]
    value

  # this function will ensure a function gets called at least once
  # afrer x delay.  by setting defaults, we can use this on backbone
  # view definitions
  #
  # Note:  I am not sure if this is the same as _.debounce or not.  I will need
  # to look into it
  idle: (code, delay=1000)->
    delay = 0 if window.DISABLE_IDLE
    handle = undefined
    ()->
      window.clearTimeout(handle) if handle
      handle = window.setTimeout(_.bind(code, @), delay)

  idleShort: (code, delay=100)->
    delay = 0 if window.DISABLE_IDLE
    handle = undefined
    ()->
      window.clearTimeout(handle) if handle
      handle = window.setTimeout(_.bind(code, @), delay)

  idleMedium: (code, delay=2000)->
    delay = 0 if window.DISABLE_IDLE
    handle = undefined
    ()->
      window.clearTimeout(handle) if handle
      handle = window.setTimeout(_.bind(code, @), delay)

  idleLong: (code, delay=5000)->
    delay = 0 if window.DISABLE_IDLE
    handle = undefined
    ()->
      window.clearTimeout(handle) if handle
      handle = window.setTimeout(_.bind(code, @), delay)

_.mixin(UnderscoreExtensions)
