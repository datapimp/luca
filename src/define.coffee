# Component Definition Helpers
#
# We have customized the core Backbone.extend process to use a slightly
# different syntax, which allows us to intercept the component definition at
# various points, and maintain information about classes being defined, and
# the relationships between inherited classes, etc.
#
# Under the hood it isn't much more than Backbone.View.extend(@proto)  
#
# Luca provides a self-documenting component generation language which
# allows you to build the @proto property in a way which captures the intent
# of the interface being described.  
#
# Example:
#   myForm = MyApp.register    'MyForm'
# 
#   myForm.extends             'Luca.components.FormView'
#
#   myForm.triggers            'some:custom:hook'
#
#   myForm.publicMethods
#     publicMethod: ()-> ...
#
#   myForm.classMethods 
#     classMethod: ()-> ...
#
# This gives us the ability to inspect our component registry at run time,
# auto-generate nice documentation, build development tools, etc.

class ComponentDefinition
  constructor:(componentName, @autoRegister=true)->
    @namespace = Luca.util.namespace()
    @componentId = @componentName = componentName
    @superClassName = 'Luca.View' 
    @properties ||= {}
    @_classProperties ||= {}

    if componentName.match(/\./)
      @namespaced = true
      parts = componentName.split('.')
      @componentId = parts.pop()
      @namespace = parts.join('.')

      # automatically add the namespace to the namespace registry
      Luca.registry.addNamespace( parts.join('.') )

    Luca.define.__definitions.push(@)

  @create: (componentName, autoRegister=Luca.config.autoRegister)->
    new ComponentDefinition(componentName, autoRegister)

  isValid: ()->
    return false unless _.isObject(@properties) 
    return false unless Luca.util.resolve(@superClassName)?
    return false unless @componentName?
    true

  isDefined: ()->
    @defined is true

  isOpen: ()->
    !!(@isValid() and not @isDefined())

  meta: (key, value)->
    metaKey = @namespace + '.' + @componentId
    metaKey = metaKey.replace(/^\./,'')
    data = Luca.registry.addMetaData(metaKey, key, value)

    @properties.componentMetaData = ()->
      Luca.registry.getMetaDataFor(metaKey)

  # allow for specifying the namespace
  in: (@namespace)-> @

  # allow for multiple ways of saying the same thing for readability purposes
  from: (@superClassName)-> @
  extends: (@superClassName)-> @
  extend: (@superClassName)-> @

  triggers: (hooks...)->
    _.defaults(@properties ||= {}, hooks: []) 
    for hook in hooks
      @properties.hooks.push(hook) 
    @properties.hooks = _.uniq(@properties.hooks)
    @meta("hooks", @properties.hooks)
    @

  includes: (includes...)->
    _.defaults(@properties ||= {}, include: []) 
    for include in includes
      @properties.include.push(include) 
    @properties.include = _.uniq(@properties.include)
    @meta("includes", @properties.include)
    @

  mixesIn: (concerns...)->
    _.defaults(@properties ||= {}, concerns: []) 
    for concern in concerns
      @properties.concerns.push(concern) 
    @properties.concerns = _.uniq(@properties.concerns)

    @meta("concerns", @properties.concerns)
    @

  contains: (components...)->
    _.defaults(@properties, components: [])
    @properties.components = components 
    @

  validatesConfigurationWith:(validationConfiguration={})->
    @meta "configuration validations", validationConfiguration
    @properties.validatable = true
    @

  beforeDefinition: (callback)->
    @_classProperties.beforeDefinition = callback  
    @

  afterDefinition: (callback)->
    @_classProperties.afterDefinition = callback  
    @

  classConfiguration: (properties={})->
    @meta("class configuration", _.keys(properties))
    _.defaults((@_classProperties||={}), properties)
    @

  configuration: (properties={})->
    @meta("public configuration", _.keys(properties) )
    _.defaults((@properties||={}), properties)
    @

  publicConfiguration: (properties={})->
    @meta("public configuration", _.keys(properties) )
    _.defaults((@properties||={}), properties)
    @

  privateConfiguration: (properties={})->
    @meta("private configuration", _.keys(properties) )
    _.defaults((@properties||={}), properties)
    @

  classInterface: (properties={})->
    @meta("class interface", _.keys(properties))
    _.defaults((@_classProperties||={}), properties)
    @

  methods: (properties={})->
    @meta("public interface", _.keys(properties) )
    _.defaults((@properties||={}), properties)
    @

  public: (properties={})->
    @meta("public interface", _.keys(properties) )
    _.defaults((@properties||={}), properties)
    @

  publicInterface: (properties={})->
    @meta("public interface", _.keys(properties) )
    _.defaults((@properties||={}), properties)
    @

  private: (properties={})->
    @meta("private interface", _.keys(properties) )
    _.defaults((@properties||={}), properties)
    @

  privateInterface: (properties={})->
    @meta("private interface", _.keys(properties) )
    _.defaults((@properties||={}), properties)
    @

  # This is the end of the chain. It MUST be called
  # in order for the component definition to be complete. 
  definePrototype: (properties={})->
    _.defaults((@properties||={}), properties)

    at = if @namespaced
      Luca.util.resolve(@namespace, (window || global))
    else
      (window||global)

    # automatically create the namespace
    if @namespaced and not at?
      eval("(window||global).#{ @namespace } = {}")
      at = Luca.util.resolve(@namespace,(window || global))

    @meta("super class name", @superClassName )
    @meta("display name", @componentName)

    @properties.displayName = @componentName
    
    @properties.componentMetaData = ()->
      Luca.registry.getMetaDataFor(@displayName)

    @_classProperties?.beforeDefinition?(@)

    definition = at[@componentId] = Luca.extend(@superClassName,@componentName, @properties)

    if @autoRegister is true 
      componentType = "view" if Luca.isViewPrototype( definition )

      if Luca.isCollectionPrototype( definition )
        Luca.Collection.namespaces ||= []
        Luca.Collection.namespaces.push( @namespace )
        componentType = "collection" 

      componentType = "model" if Luca.isModelPrototype( definition )

      # automatically register this with the component registry
      Luca.registerComponent( _.string.underscored(@componentId), @componentName, componentType)

    @defined = true

    unless _.isEmpty(@_classProperties)
      _.extend(definition, @_classProperties)

    definition?.afterDefinition?.call(definition, @)

    definition


# Aliases for the mixin definition
cd = ComponentDefinition::

cd.concerns = cd.behavesAs = cd.uses = cd.mixesIn 

# Aliases for the final call on the define proxy
cd.register = cd.defines = cd.defaults = cd.exports = cd.defaultProperties = cd.definePrototype

cd.defaultsTo = cd.enhance = cd.with = cd.definePrototype

cd.publicMethods = cd.publicInterface
cd.privateMethods = cd.privateInterface
cd.classProperites = cd.classMethods = cd.classInterface

_.extend (Luca.define = ComponentDefinition.create),
  __definitions: []
  incomplete: ()->
    _( Luca.define.__definitions ).select (definition)-> 
      definition.isOpen()
  close: ()->
    for open in Luca.define.incomplete()
      open.register() if open.isValid()
    Luca.define.__definitions.length = 0
  findDefinition: (componentName)->
    _( Luca.define.__definitions ).detect (definition)->
      definition.componentName is componentName

Luca.register = (componentName)->
  new ComponentDefinition(componentName, true)

_.mixin def: Luca.define

# The last method of the ComponentDefinition chain is always going to result in
# a call to Luca.extend.  Luca.extend wraps the call to Luca.View.extend,
# or Backbone.Collection.extend, and accepts the names of the extending,
# and extended classes as strings.  This allows us to maintain information
# and references to the classes and their prototypes, mainly for the purposes
# of introspection and development tools
Luca.extend = (superClassName, childName, properties={})->
  superClass = Luca.util.resolve( superClassName, (window || global) )

  unless _.isFunction(superClass?.extend)
    throw "Error defining #{ childName }. #{ superClassName } is not a valid component to extend from"

  superMetaData = Luca.registry.getMetaDataFor(superClassName)
  superMetaData.descendants().push(childName)

  properties.displayName = childName

  properties._superClass = ()->
    superClass.displayName ||= superClassName
    superClass

  properties._super = (method, context=@, args=[])->
    # TODO: debug this better
    # protect against a stack too deep error in weird cases
    @_superClass().prototype[method]?.apply(context, args)

  definition = superClass.extend(properties)

  # _.def("MyView").extends("View").with
  #   include: ['Luca.Events']
  if _.isArray( properties?.include )
    for include in properties.include
      include = Luca.util.resolve(include) if _.isString(include)
      _.extend(definition::, include)

  definition

