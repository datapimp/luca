model = Luca.define       'Luca.Model'

model.extends             'Backbone.Model'

model.includes            'Luca.Events'

model.defines
  initialize: ()->
    Backbone.Model::initialize(@, arguments)
    setupComputedProperties.call(@)

  read: (attr)->
    if _.isFunction(@[attr])
      @[attr].call(@)
    else
      @get(attr)

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
      @_computed[attr] = @[attr].call @

    dependencies = dependencies.split(',') if _.isString(dependencies)

    _(dependencies).each (dep)=>
      @on "change:#{dep}", ()=>
        @trigger "change:#{attr}"
        
      @trigger "change:#{attr}" if @has(dep) 
