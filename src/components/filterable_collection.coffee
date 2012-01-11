Luca.components.FilterableCollection = Backbone.Collection.extend
  initialize: (models, options={})->
    _.extend @, options

    Backbone.Collection.prototype.initialize.apply @, arguments

    @bind "before:fetch", @beforeFetch if _.isFunction(@beforeFetch)

    @bind "reset", ()=> 
      @fetching = false
    
    # DEPRECATED
    @url ||= @base_url

    if _.isFunction( @url )
      @url = _.wrap @url, (original)=>
    else
      @base_url = @url

      @url = ()-> 
        @base_url

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

  applyFilter: (@params={}, autoFetch=true)->
    base = @baseParams.apply(@) if _.isFunction( @baseParams )
    base ||= @baseParams if _.isObject( @baseParams )

    _.extend @params, base

    @fetch() if @autoFetch

  parse: (response)-> if @root? then response[ @root ] else response
