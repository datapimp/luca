#### Luca
# 
# A Backbone.View framework which encapsulates common
# design patterns and best practices for containers, layouts,
# and components.
#
#### Lazy Rendering and Configuration
#
#   Using a registry of Component Types ( a.k.a ctype )
#   allows us to nest view definition in JSON.  It won't
#   create the view until it is needed / rendered 
#
#### Container Views
#
#   A common pattern in Backbone is that you have views which
#   contain other views, and organizes them in some sort of 
#   layout.  The contained views themselves are typically the
#   views which are bound to models and collections, while the 
#   container usually handles more structural DOM components.
#
#   Luca simplifies this by providing container templates which
#   are fully nestable.  You can have a ColumnView contain two
#   CardViews and each CardView contain a SplitView.  The whole thing
#   can be contained by a ModalView.
#
#   We provide nestable containers such as:
#
#   CardView: A collection of views where only one view
#   will be visible at any given time, and where showing
#   one hides another.
#
#   ColumnView: A view which organizes views along horizontally
#   split columns
#
#   SplitView: A view which organizes other views in vertical space 
#
#   ModalView: A jQuery simple modal view
#
_.mixin( _.string )

window.Luca =
  core: {}
  containers: {}
  components: {}
  fields: {}
  util: {}
  registry:
    classes: {}
    namespaces:["Luca.containers","Luca.components"]
  component_cache:
    cid_index: {}
    name_index: {}

# adds an additional namespace to look for luca ui
# components.  useful for when you define a bunch of
# components in your own application's namespace
Luca.registry.addNamespace = (identifier)->
  Luca.registry.namespaces.push( identifier )
  Luca.registry.namespaces = _( Luca.registry.namespaces ).uniq()

# stores or looks up a component in the component cache
# by its backbone @cid or by its component_name
Luca.cache = (needle, component)->
  Luca.component_cache.cid_index[ needle ] = component if component?

  component = Luca.component_cache.cid_index[ needle ]
  
  # optionally, cache it by tying its name to its cid for easier lookups
  if component?.component_name?
    Luca.component_cache.name_index[ component.component_name ] = component.cid
  else if component?.name?
    Luca.component_cache.name_index[ component.name ] = component.cid

  return component if component?

  # perform a lookup by name if the component_id didn't turn anything
  lookup_id = Luca.component_cache.name_index[ needle ]

  Luca.component_cache.cid_index[ lookup_id ]

# Lookup a component in the Luca component registry
# by it's ctype identifier.  If it doesn't exist,
# check any other registered namespace
Luca.registry.lookup = (ctype)->
  c = Luca.registry.classes[ctype]

  return c if c?

  nestedLookup = (namespace)->
    parent = _( namespace.split(/\./) ).inject (obj,key)->
      obj = obj[key]
    , window

  className = _.camelize _.capitalize( ctype )

  parents = _( Luca.registry.namespaces ).map (namespace)-> nestedLookup(namespace)
  
  _.first _.compact _( parents ).map (parent)-> parent[className]

# creates a new object from a hash with a ctype property
# matching something in the Luca registry
Luca.util.LazyObject = (config)->
  ctype = config.ctype
  
  component_class = Luca.registry.lookup( ctype )

  throw "Invalid Component Type: #{ ctype }.  Did you forget to register it?" unless component_class

  constructor = eval( component_class )

  new constructor(config)

# for lazy component creation
Luca.register = (component, constructor_class)->
  exists = Luca.registry.classes[component]

  if exists?
    throw "Can not register component with the signature #{ component }. Already exists"
  else
    Luca.registry.classes[component] = constructor_class

Luca.available_templates = (filter="")->
  available = _( Luca.templates ).keys()

  if filter.length > 0
    _( available ).select (tmpl)-> tmpl.match(filter)
  else
    available

$ do -> 
  console.log "Enabling Luca-UI"
  $('body').addClass('luca-ui-enabled')
