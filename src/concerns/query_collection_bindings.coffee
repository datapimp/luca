Luca.concerns.QueryCollectionBindings = 
  getCollection: ()->
    @collection

  loadModels: (models=[], options={})->
    @getCollection()?.reset(models, options)

  applyQuery: (query={},queryOptions={})->
    @query = query
    @queryOptions = queryOptions
    @refresh()
    @

  # Private: returns the query that is applied to the underlying collection.
  # accepts the same options as Luca.Collection.query's initial query option.
  getQuery: (options={})-> 
    query = @query ||= {}

    for querySource in _( @querySources || [] ).compact()
      query = _.extend(query, (querySource(options)||{}) ) 
          
    Luca.util.readAll(query)

  # Private: returns the query that is applied to the underlying collection.
  # accepts the same options as Luca.Collection.query's initial query option.
  getQueryOptions: (options={})-> 
    queryOptions = @queryOptions ||= {}

    for optionSource in _( @optionsSources || [] ).compact()
      queryOptions = _.extend(queryOptions, (optionSource(options)||{}) ) 

    queryOptions
  # Private: returns the models to be rendered.  If the underlying collection
  # responds to @query() then it will use that interface. 
  getModels: (query,options)->
    if @collection?.query
      query ||= @getQuery()
      options ||= @getQueryOptions()
      options.prepare ||= @prepareQuery

      # TODO
      # Need to write specs for this  
      @collection.query(query, options)
    else
      @collection.models

