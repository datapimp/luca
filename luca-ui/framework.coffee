window.Luca =
  util: {}

# creates a new object from a hash with a ctype property
# matching something in the Luca registry
Luca.util.LazyObject = (config)->
  ctype = config.ctype
  
  component_class = Luca.registry[ ctype ]

  throw "Invalid Component Type: #{ ctype }" unless component_class
  
  constructor = eval( component_class )

  new constructor(config)


Luca.registry = {}

# for lazy component creation
Luca.register = (component, constructor_class)->
  exists = Luca.registry[component]

  if exists?
    throw "Can not register component with the signature #{ component }. Already exists"
  else
    Luca.registry[component] = constructor_class
