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
      
    query

  # Private: returns the query that is applied to the underlying collection.
  # accepts the same options as Luca.Collection.query's initial query option.
  getQueryOptions: (options={})-> 
    options = @queryOptions ||= {}

    for optionSource in _( @optionsSources || [] ).compact()
      options = _.extend(options, (optionSource(options)||{}) ) 

    options

  # Private: returns the models to be rendered.  If the underlying collection
  # responds to @query() then it will use that interface. 
  getModels: (query,options)->
    if @collection?.query
      query ||= @getQuery()
      options ||= @getQueryOptions()
      
      @collection.query(query, options)
    else
      @collection.models

