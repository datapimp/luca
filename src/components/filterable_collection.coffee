Luca.components.FilterableCollection = Backbone.Collection.extend
  initialize: (models, options={})->
    _.extend @, options
    Backbone.Collection.prototype.initialize.apply @, arguments

    @bind "before:fetch", @beforeFetch if _.isFunction(@beforeFetch)

    @bind "reset", ()=> @fetching = false

  fetch: (options)->
    @trigger "before:fetch", @
    @fetching = true
    Backbone.Collection.prototype.fetch.apply @, arguments
  
  ifLoaded: (fn, scope=@)->
    if @models.length > 0 and not @fetching
      fn.apply scope, @

    @bind "reset", (collection)=>
      fn.apply scope, [collection]

    unless @fetching
      @fetch()

  applyFilter: (@params={})->

  parse: (response)-> if @root? then response[ @root ] else response
