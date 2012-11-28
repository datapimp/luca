multiView = Luca.register     "Luca.components.MultiCollectionView"

# The CollectionMultiView is a collection view with multiple renderings
# of the list.  ( e.g. Icons, Table, List ).  It works by maintaining
# a current view, and rendering that view.  It refreshes the views
# whenever they are activated. 
#
# The MultiView allows you to share one collection, filter, pagination setup
# but render multiple versions of a model.  To do this, you  are expected to
# define one or more objects in the @views property of the component.

# Example:
#   multiView = new Luca.components.MultiCollectionView
#     collection: "my_collection"
#     paginatable:
#       page: 1
#       limit: 20
#     views:[
#       type:           "table"
#       columns:[
#         header: "Header"
#         reader: "attribute"
#       ]
#     ]
multiView.extends           "Luca.containers.CardView"

multiView.mixesIn         "LoadMaskable",
                          "Filterable",
                          "Paginatable"

multiView.triggers          "before:refresh",
                            "after:refresh",
                            "refresh",
                            "empty:results"

multiView.defaultsTo
  version: 1

  stateful: true

  defaultState:
    activeView: 0

  viewContainerClass: "luca-ui-multi-view-container"

  initialize: (@options={})->
    @components ||= @views

    validateComponent( view ) for view in @components    

    @on "refresh", @refresh, @
    @on "after:card:switch", @refresh, @
    @on "after:components", propagateCollectionComponents, @

    @debug("multi collection , proto initialize")

    Luca.containers.CardView::initialize.apply(@, arguments) 

  relayAfterRefresh: (models,query,options)->
    @trigger "after:refresh", models, query, options

  refresh: ()->
    @activeComponent()?.trigger("refresh")

  getCollection: ()->
    @collection

  applyQuery: (query={},queryOptions={})->
    @query = query
    @queryOptions = queryOptions
    @

  # Private: returns the query that is applied to the underlying collection.
  # accepts the same options as Luca.Collection.query's initial query option.
  getQuery: ()-> 
    @debug("Get Query")
    query = @query ||= {}
    for querySource in @querySources 
      query = _.extend(query, (querySource()||{}) ) 
    query

  # Private: returns the query that is applied to the underlying collection.
  # accepts the same options as Luca.Collection.query's initial query option.
  getQueryOptions: ()-> 
    @debug("Get Query Options")
    options = @queryOptions ||= {}

    for optionSource in @optionsSources 
      options = _.extend(options, (optionSource()||{}) ) 

    options  

propagateCollectionComponents = ()->
  container = @

  # in the multi view will share the same
  # collection, filter state, pagination options, etc
  for component in @components

    component.on "after:refresh", (models,query,options)=> 
      @debug "collection member after refresh"
      @trigger("after:refresh",models,query,options)

    _.extend component, 
      collection: container.getCollection()

      getQuery: ()->
        container.getQuery.call(container)

      getQueryOptions: ()->
        container.getQueryOptions.call(container) 

validateComponent = (component)->
  type = (component.type || component.ctype)

  return if  type is "collection" or 
             type is "collection_view" or
             type is "table" or
             type is "table_view" 

  throw "The MultiCollectionView expects to contain multiple collection views" 
