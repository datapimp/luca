# Takes an string like "deep.nested.value" and an object like window
# and returns the value of window.deep.nested.value.  useful for defining
# references on objects which don't yet exist, as strings, which get
# evaluated at runtime when such references will be available
Luca.util.resolve = (accessor, source_object)->
  try
    source_object ||= (window || global)
    resolved = _( accessor.split(/\./) ).inject (obj,key)->
      obj = obj?[key]
    , source_object
  catch e
    console.log "Error resolving", accessor, source_object
    throw e
    
  resolved

# A better name for Luca.util.nestedValue
Luca.util.nestedValue = Luca.util.resolve

Luca.util.argumentsLogger = (prompt)->
  ()-> console.log prompt, arguments

Luca.util.read = (property, args...)->
  if _.isFunction(property) then property.apply(@, args) else property

# turns a word like form_view into FormView
Luca.util.classify = (string="")->
  _.string.camelize( _.string.capitalize( string ) )

# looks up a method on an object by its event trigger
# in the format of what:ever => whatEver
Luca.util.hook = (eventId="")->
  parts = eventId.split(':')
  prefix = parts.shift()

  parts = _( parts ).map (p)-> _.string.capitalize(p)
  fn = prefix + parts.join('')

Luca.util.isIE = ()->
  try
    Object.defineProperty({}, '', {})
    return false
  catch e
    return true

currentNamespace = (window || global)

Luca.util.namespace = (namespace)->
  return currentNamespace unless namespace?
  currentNamespace = if _.isString(namespace) then Luca.util.resolve(namespace,(window||global)) else namespace

  if currentNamespace?
    return currentNamespace

  currentNamespace = eval("(window||global).#{ namespace } = {}")

# one of the main benefits of Luca is the ability to structure your app as
# large blocks of JSON configuration.  In order to convert an object into
# a Luca component, we lookup the object's class by converting its ctype / type
# property into a class that has been registered in the component registry
Luca.util.lazyComponent = (config)->
  if _.isObject(config)
    ctype = config.ctype || config.type

  if _.isString(config)
    ctype = config

  componentClass = Luca.registry.lookup( ctype )

  throw "Invalid Component Type: #{ ctype }.  Did you forget to register it?" unless componentClass

  constructor = eval( componentClass )

  new constructor(config)

Luca.util.selectProperties = (iterator, object, context)->
  values = _( object ).values()
  _( values ).select( iterator )

Luca.util.loadScript = (url, callback) ->
  script = document.createElement("script")
  script.type = "text/javascript"

  if (script.readyState)
    script.onreadystatechange = ()->
      if script.readyState == "loaded" || script.readyState == "complete"
        script.onreadystatechange = null
        callback()
      else
        script.onload = ()->
          callback()

  script.src = url
  document.body.appendChild(script)

Luca.util.make = Backbone.View::make

Luca.util.list = (list,options={},ordered)->
  container = if ordered then "ol" else "ul"
  container = Luca.util.make(container,options)
  if _.isArray(list)
    for item in list
      $(container).append Luca.util.make("li",{},item)

  container.outerHTML

# generates a badge element
# valid types are success, warning, important, info, inverse
Luca.util.label = (contents="", type, baseClass="label")->
  cssClass = baseClass
  cssClass += " #{ baseClass}-#{ type }" if type?
  Luca.util.make("span",{class:cssClass},contents)

# generates a badge element
# valid types are success, warning, important, info, inverse
Luca.util.badge = (contents="", type, baseClass="badge")->
  cssClass = baseClass
  cssClass += " #{ baseClass }-#{ type }" if type?
  Luca.util.make("span",{class:cssClass},contents)

