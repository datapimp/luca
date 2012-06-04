registry =
  classes:{}
  namespaces:['Luca.containers','Luca.components']

component_cache =
  cid_index: {}
  name_index: {}

# For container views, if a component is defined with no ctype
# then we will pick this one when using
Luca.defaultComponentType = 'view'


# When you use _.def to define a component, you say
# which class it extends() from, and with() which enhancements.

# We register that component class for you:
Luca.register = (component, prototypeName)->
  registry.classes[ component ] = prototypeName

Luca.development_mode_register = (component, prototypeName)->
  existing = registry.classes[component]

  if Luca.enableDevelopmentTools is true and existing?
    prototypeDefinition = Luca.util.resolve( existing, window)

    liveInstances = Luca.registry.findInstancesByClassName( prototypeName )

    _( liveInstances ).each (instance)->
      instance?.refreshCode?.call(instance, prototypeDefinition)

  Luca.register( component, prototypeName )

# We create a @ctype alias for this component definition, and register
# the class in a registry.

# If you use a custom namespace like MyApp.views.ListView,
# then we will register MyApp.views as a namespace.  You can
# do this yourself too.
Luca.registry.addNamespace = (identifier)->
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
# by it's ctype identifier.  If it doesn't exist,
# check any other registered namespace
Luca.registry.lookup = (ctype)->
  c = registry.classes[ctype]

  return c if c?

  className = Luca.util.classify(ctype)

  parents = Luca.registry.namespaces()

  fullPath = _( parents ).chain().map((parent)->
    parent[className]).compact().value()?[0]

Luca.registry.findInstancesByClassName = (className)->
  instances = _( Luca.component_cache.cid_index ).values()
  _( instances ).select (instance)->
    instance.displayName is className or instance._superClass?()?.displayName is className

Luca.registry.classes = ()->
  _( registry.classes ).map (className, ctype)->
    className: className
    ctype: ctype

Luca.cache = (needle, component)->
  component_cache.cid_index[ needle ] = component if component?

  component = component_cache.cid_index[ needle ]

  # optionally, cache it by tying its name to its cid for easier lookups
  if component?.component_name?
    component_cache.name_index[ component.component_name ] = component.cid
  else if component?.name?
    component_cache.name_index[ component.name ] = component.cid

  return component if component?

  # perform a lookup by name if the component_id didn't turn anything
  lookup_id = component_cache.name_index[ needle ]

  component_cache.cid_index[ lookup_id ]


