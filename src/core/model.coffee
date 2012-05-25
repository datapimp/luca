# Luca.Model
#
# Luca.Model is an extenstion of Backbone.Model which provides
# few useful patterns:
#
#   - computed properties support
_.component('Luca.Model').extends('Backbone.Model').with
  initialize: ()->
    Backbone.Model::initialize @, arguments

    return if _.isUndefined(@computed)

    @_computed = {}

    for attr, dependencies of @computed
      @on "change:#{attr}", ()=>
        @_computed[attr] = @[attr].call @

      _(dependencies).each (dep)=>
        @on "change:#{dep}", ()=>
          @trigger "change:#{attr}"
        @trigger "change:#{attr}" if @has(dep)

  get: (attr)->
    if @computed?.hasOwnProperty(attr)
      @_computed[attr]
    else
      Backbone.Model::get.call @, attr
