Luca.concern = (mixinName)->
  namespace = _( Luca.concern.namespaces ).detect (space)->
    Luca.util.resolve(space)?[ mixinName ]?

  namespace ||= "Luca.concerns"

  resolved = Luca.util.resolve(namespace)[ mixinName ]

  console.log "Could not find #{ mixinName } in ", Luca.concern.namespaces unless resolved?

  resolved

Luca.concern.namespaces = [
  "Luca.concerns"
]

Luca.concern.namespace = (namespace)->
  Luca.concern.namespaces.push(namespace)
  Luca.concern.namespaces = _( Luca.concern.namespaces ).uniq()
  
Luca.concern.setup = ()->
  if @concerns?.length > 0
    for module in @concerns 
      Luca.concern(module)?.__initializer?.call(@, @, module)  

# Luca.decorate('Luca.View').with('Luca.concerns.MyCustomMixin')
Luca.decorate = (target)->
  try
    if _.isString(target)
      componentName = target
      componentClass = Luca.util.resolve(componentName)

    componentClass      = target if _.isFunction(target) 
    componentPrototype  = componentClass.prototype 
    componentName       = componentName || componentClass.displayName
    componentName       ||= componentPrototype.displayName
  catch e    
    console.log e.message
    console.log e.stack
    console.log "Error calling Luca.decorate on ", componentClass, componentPrototype, componentName

    throw(e)

  return with: (mixinName)->
    mixinDefinition = Luca.concern(mixinName)
    mixinDefinition.__displayName ||= mixinName

    mixinPrivates   = _( mixinDefinition ).chain().keys().select (key)-> 
      "#{ key }".match(/^__/) or key is "classMethods"

    sanitized   = _( mixinDefinition ).omit( mixinPrivates.value() )

    _.extend(componentPrototype, sanitized)

    if mixinDefinition.classMethods?
      _.defaults(componentClass, mixinDefinition.classMethods)
        
    # When a mixin is included, we may want to do things 
    mixinDefinition?.__included?(componentName, componentClass, mixinDefinition)

    superclassMixins = componentPrototype._superClass()::concerns

    componentPrototype.concerns ||= []
    componentPrototype.concerns.push( mixinName )
    componentPrototype.concerns = componentPrototype.concerns.concat( superclassMixins )

    componentPrototype.concerns = _( componentPrototype.concerns ).chain().uniq().compact().value()

    componentPrototype