# the Luca() browser utility function is meant to be a smart wrapper around various
# types of input which will return what the developer would expect given the
# context it is used.
(window || global).Luca = (payload, args...)->
  if _.isString(payload) and result = Luca.cache(payload)
    return result

  if _.isString(payload) and result = Luca.find(payload)
    return result

  if _.isObject(payload) and payload.ctype?
    return Luca.util.lazyComponent( payload )

  if _.isObject(payload) and payload.defines and payload.extends
    definition = payload.defines
    inheritsFrom = payload.extends

  if _.isFunction( fallback = _(args).last() )
    return fallback()

_.extend Luca,
  VERSION: "0.9.66"
  core: {}
  containers: {}
  components: {}
  modules: {}
  util: {}
  fields: {}
  registry:{}
  options: {}
  config: {}

# for triggering / binding to component definitions
_.extend Luca, Backbone.Events

# When using Luca.define() should we automatically register
# the component with the registry?
Luca.autoRegister = Luca.config.autoRegister = true

# if developmentMode is true, you have access to some neat development tools
Luca.developmentMode = Luca.config.developmentMode = false

# The Global Observer is very helpful in development
# it observes every event triggered on every view, collection, model
# and allows you to inspect / respond to them.  Use in production
# may have performance impacts which has not been tested
Luca.enableGlobalObserver = Luca.config.enableGlobalObserver = false

# let's use the Twitter 2.0 Bootstrap Framework
# for what it is best at, and not try to solve this
# problem on our own!
Luca.enableBootstrap = Luca.config.enableBootstrap = true

Luca.config.enhancedViewProperties = true

Luca.keys =
  ENTER: 13
  ESCAPE: 27
  KEYLEFT: 37
  KEYUP: 38
  KEYRIGHT: 39
  KEYDOWN: 40
  SPACEBAR: 32
  FORWARDSLASH: 191

# build a reverse map
Luca.keyMap = _( Luca.keys ).inject (memo, value, symbol)->
  memo[value] = symbol.toLowerCase()
  memo
, {}

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
  _( Luca.parentClasses(obj) ).map (className)-> Luca.util.resolve(className)

Luca.parentClasses = (obj)->
  list = []

  if _.isString(obj)
    obj = Luca.util.resolve(obj)

  list.push( obj.displayName || obj::?.displayName || Luca.parentClass(obj) )

  classes = until not Luca.parentClass(obj)?
    obj = Luca.parentClass(obj)

  list = list.concat(classes)

  _.uniq list

Luca.parentClass = (obj)->
  list = []

  if _.isString( obj )
    obj = Luca.util.resolve(obj)

  if Luca.isComponent(obj)
    obj.displayName

  else if Luca.isComponentPrototype(obj)
    obj::_superClass?()?.displayName

# This is a convenience method for accessing the templates
# available to the client side app, either the ones which ship with Luca
# available in Luca.templates ( these take precedence ) or
# the app's own templates which are usually available in JST

# optionally, passing in variables will compile the template for you, instead
# of returning a reference to the function which you would then call yourself
Luca.template = (template_name, variables)->
  window.JST ||= {}

  if _.isFunction(template_name)
    return template_name(variables)

  luca = Luca.templates?[ template_name ]
  jst = JST?[ template_name ]

  unless luca? or jst?
    needle = new RegExp("#{ template_name }$")

    luca = _( Luca.templates ).detect (fn,template_id)->
      needle.exec( template_id )

    jst = _( JST ).detect (fn,template_id)->
      needle.exec( template_id )

  throw "Could not find template named #{ template_name }" unless luca || jst

  template = luca || jst

  return template(variables) if variables?

  template

Luca.available_templates = (filter="")->
  available = _( Luca.templates ).keys()

  if filter.length > 0
    _( available ).select (tmpl)-> tmpl.match(filter)
  else
    available


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
