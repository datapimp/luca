Luca.components.FilterableCollection = Backbone.Collection.extend
  initialize: (models, options={})->
    _.extend @, options
    Backbone.Collection.prototype.initialize.apply @, arguments

    @bind "before:fetch", @beforeFetch if _.isFunction(@beforeFetch)

  fetch: (options)->
    @trigger "before:fetch", @
    Backbone.Collection.prototype.fetch.apply @, arguments

  applyFilter: (@params={})->

  parse: (response)-> if @root? then response[ @root ] else response
