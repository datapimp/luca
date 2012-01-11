Luca.components.FilterableCollection = Luca.Collection.extend 
  initialize: (models, @options={})->
    _.extend @, @options
    Luca.Collection.prototype.initialize.apply @, arguments
    
    @url ||= @base_url
    
    if @base_url
      console.log "The use of base_url is deprecated"

    @filter = Luca.Collection.baseParams()

    if _.isFunction(@url)
      @url = _.wrap @url, (fn)=>
        val = fn.apply @ 
        "#{ val }?#{ @queryString() }"

    else
      url = @url
      params = @queryString()

      @url = _([url,params]).compact().join("?")
  
  queryString: ()->
    parts = _( @filter ).inject (memo, value, key)=>
      str = "#{ key }=#{ value }"
      memo.push(str)
      memo
    , [] 

    parts.join("&")

  applyFilter: (filter={}, autoFetch=true)->
    _.extend @filter, filter

    @fetch() if @autoFetch

