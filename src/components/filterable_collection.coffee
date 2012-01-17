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
        parts = val.split('?')

        existing_params = _.last(parts) if parts.length > 1

        queryString = @queryString()
        
        if existing_params and val.match(existing_params)
          queryString = queryString.replace( existing_params, '')

        new_val = "#{ val }?#{ queryString }"
        new_val = new_val.replace(/\?$/,'') if new_val.match(/\?$/)

        new_val
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

    _.uniq(parts).join("&")

  applyFilter: (filter={}, options={auto:true,refresh:true})->
    _.extend @filter, filter

    @fetch(options) unless not options.auto

