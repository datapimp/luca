Luca.components.FilterableCollection = Backbone.Collection.extend
  initialize: (models, options={})->
    _.extend @, options
    
    @bind "before:fetch", @beforeFetch if _.isFunction(@beforeFetch)

    @bind "reset", ()=> 
      @fetching = false
 
  fetch: (options)->
    @trigger "before:fetch", @
    @fetching = true
    
    url = if _.isFunction( @url ) then @url() else @url
    
    return unless @url.length > 0

    try
      Backbone.Collection.prototype.fetch.apply(@, arguments)
    catch e
      console.log "Error in Collection.fetch", @, e
      throw(e)
  
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
