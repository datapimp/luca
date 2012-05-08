# Luca.Model
#
# Luca.Model is an extenstion of Backbone.Model which provides
# few useful patterns:
#
#   - computed properties support
Luca.Model = Backbone.Model.extend
  initialize: ()->
    Backbone.Model::initialize @, arguments

    return if _.isUndefined(@computed)

    for attr, dependencies of @computed
      @on "change:#{attr}", ()=>
        param = {}
        param["_#{attr}"] = @[attr].call @
        @set(param)

      _(dependencies).each (dep)=>
        @on "change:#{dep}", ()=>
          @trigger "change:#{attr}"
        @trigger "change:#{attr}" if @has(dep)

  get: (attr)->
    attr = "_#{attr}" if @computed?.hasOwnProperty(attr)
    Backbone.Model::get.call @, attr
