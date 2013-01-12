registry =
  classes:{}
  model_classes: {}
  collection_classes: {}
  namespaces:['Luca.containers','Luca.components']

componentCacheStore =
  cid_index: {}
  name_index: {}

# For container views, if a component is defined with no ctype
# then we will pick this one when using
Luca.config.defaultComponentClass = Luca.defaultComponentClass  = 'Luca.View'
Luca.config.defaultComponentType  = Luca.defaultComponentType   = 'view'

Luca.registry.deprecatedComponents = {}
Luca.registry.componentAliases = {}

Luca.registry.typeAliases = 
  grid:         "grid_view"
  form:         "form_view"
  text:         "text_field"
  button:       "button_field"
  select:       "select_field"
  card:         "card_view"
  paged:        "card_view"
  wizard:       "card_view"
  collection:   "collection_view"
  list:         "collection_view"
  multi:        "collection_multi_view"
  table:        "table_view"

# When you use _.def to define a component, you say
# which class it extends() from, and with() which enhancements.
# We register that component class for you:
Luca.registerComponent = (component, prototypeName, componentType="view")->
  Luca.trigger "component:registered", component, prototypeName

  switch componentType
    when "model"
      registry.model_classes[ component ] = prototypeName
    when "collection"
      registry.collection_classes[ component ] = prototypeName
    else
      registry.classes[ component ] = prototypeName

Luca.development_mode_register = (component, prototypeName)->
  existing = registry.classes[component]

  if Luca.enableDevelopmentTools is true and existing?
    prototypeDefinition = Luca.util.resolve( existing, window)

    liveInstances = Luca.registry.findInstancesByClassName( prototypeName )

    _( liveInstances ).each (instance)->
      instance?.refreshCode?.call(instance, prototypeDefinition)

  Luca.registerComponent( component, prototypeName )

# We create a @ctype alias for this component definition, and register
# the class in a registry.

# If you use a custom namespace like MyApp.views.ListView,
# then we will register MyApp.views as a namespace.  You can
# do this yourself too.
Luca.registry.addNamespace = Luca.registry.namespace = (identifier)->
  registry.namespaces.push( identifier )
  registry.namespaces = _( registry.namespaces ).uniq()

# This allows us to declare relationships between objects at definition time
# and have the instances of these objects be created at runtime when they
# are available.
#
# it also allows us to build tools to monitor what is going on inside of an
# application, which makes testing and debugging easier, and also serves as
# the basis of Luca's in browser development tools.
Luca.registry.namespaces = (resolve=true)->
  _( registry.namespaces ).map (namespace)->
    if resolve then Luca.util.resolve( namespace ) else namespace

# Lookup a component in the Luca component registry
# by it's type identifier.  If it doesn't exist,
# check any other registered namespace
Luca.registry.lookup = (ctype)->
  if alias = Luca.registry.typeAliases[ ctype ] 
    ctype = alias
    
  c = registry.classes[ctype]

  return c if c?

  className = Luca.util.classify(ctype)

  parents = Luca.registry.namespaces()

  fullPath = _( parents ).chain().map (parent)->
    parent[className]
  .compact().value()?[0]

Luca.registry.instances = ()->
  _( componentCacheStore.cid_index ).values()
 
Luca.registry.findInstancesByClass = (componentClass)->
  Luca.registry.findInstancesByClassName( componentClass.displayName )

Luca.registry.findInstancesByClassName = (className)->
  className = className.displayName if not _.isString( className )
  instances = Luca.registry.instances() 
  _( instances ).select (instance)->
    isClass = instance.displayName is className

    instance.displayName is className or instance._superClass?()?.displayName is className

Luca.registry.classes = (toString=false)->
  _(_.extend({},registry.classes,registry.model_classes,registry.collection_classes)).map (className, ctype)->
    if toString
      className
    else
      className: className
      ctype: ctype

Luca.registry.find = (search)->
  Luca.util.resolve(search) || Luca.define.findDefinition(search)

Luca.cache = Luca.registry.cacheInstance = (cacheKey, object)->
  return unless cacheKey?
  return object if object?.doNotCache is true

  if object?
    componentCacheStore.cid_index[ cacheKey ] = object 

  object = componentCacheStore.cid_index[ cacheKey ]

  # optionally, cache it by tying its name to its cid for easier lookups
  if object?.component_name?
    componentCacheStore.name_index[ object.component_name ] = object.cid
  else if object?.name?
    componentCacheStore.name_index[ object.name ] = object.cid

  return object if object?

  # perform a lookup by name if the cid lookup didn't turn anything
  lookup_id = componentCacheStore.name_index[ cacheKey ]

  componentCacheStore.cid_index[ lookup_id ]
