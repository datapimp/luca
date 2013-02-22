model = Luca.register     'Luca.Model'

model.extends             'Backbone.Model'

model.includes            'Luca.Events'

model.defines
  initialize: ()->
    Backbone.Model::initialize(@, arguments)
    setupComputedProperties.call(@)
    Luca.concern.setup.call(@)

  read: (attr)->
    if _.isFunction(@[attr])
      @[attr].call(@)
    else
      @get(attr) || @[attr]

  get: (attr)->
    if @computed?.hasOwnProperty(attr)
      @_computed[attr]
    else
      Backbone.Model::get.call @, attr

setupComputedProperties = ()->
  return if _.isUndefined(@computed)

  @_computed = {}

  for attr, dependencies of @computed
    @on "change:#{attr}", ()=>
      @_computed[attr] = @read(attr) 

    dependencies = dependencies.split(',') if _.isString(dependencies)

    _(dependencies).each (dep)=>
      @on "change:#{dep}", ()=>
        @trigger "change:#{attr}"
        
      @trigger "change:#{attr}" if @has(dep) 


Luca.Model._originalExtend = Backbone.Model.extend

Luca.Model.extend = (definition={})->
  # for backward compatibility
  definition.concerns ||= definition.concerns if definition.concerns?

  componentClass = Luca.Model._originalExtend.call(@, definition)
  
  if definition.concerns? and _.isArray( definition.concerns )
    for module in definition.concerns
      Luca.decorate( componentClass ).with( module )

  componentClass

