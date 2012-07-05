# Computed Properties Support
# ###
#
# Luca.Model supports computed properties, which are 
# object methods which are composed of model attributes or
# of calculations which are dependent on these attributes.

# When these model attributes change, the computed property
# needs to be re-evaluated.  
#
# The configuration API for computed properties expects a hash
# whose keys are the name of the method, and whose value is
# an array of the attribute dependencies for that method.  
setupComputedProperties = ()->
  return if _.isUndefined(@computed)

  @_computed = {}

  for attr, dependencies of @computed
    @on "change:#{attr}", ()=>
      @_computed[attr] = @[attr].call @

    _(dependencies).each (dep)=>
      @on "change:#{dep}", ()=>
        @trigger "change:#{attr}"
      @trigger "change:#{attr}" if @has(dep) 


_.def('Luca.Model').extends('Backbone.Model').with
  include: ['Luca.Events']

  initialize: ()->
    Backbone.Model::initialize @, arguments
    setupComputedProperties.call(@)

  get: (attr)->
    if @computed?.hasOwnProperty(attr)
      @_computed[attr]
    else
      Backbone.Model::get.call @, attr
