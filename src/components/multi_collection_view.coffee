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

multiView.mixesIn           "QueryCollectionBindings", 
                            "LoadMaskable",
                            "Filterable",
                            "Paginatable",
                            "Sortable"

multiView.triggers          "before:refresh",
                            "after:refresh",
                            "refresh",
                            "empty:results"

multiView.private
  stateful:
    activeView: 0

  initialize: (@options={})->
    @components ||= @views

    for view in @components    
      Luca.components.MultiCollectionView.validateComponent( view ) 

    Luca.containers.CardView::initialize.apply(@, arguments) 

    @on "data:refresh", @refresh, @
    @on "after:card:switch", @refresh, @
    @on "after:components", Luca.components.MultiCollectionView.propagateCollectionComponents, @

  relayAfterRefresh: (models,query,options)->
    @trigger "after:refresh", models, query, options

  refresh: ()->
    @activeComponent()?.refresh()

multiView.classMethods
  propagateCollectionComponents: ()->
    container = @

    # in the multi view will share the same
    # collection, filter state, pagination options, etc
    for component in @components

      component.on "after:refresh", (models,query,options)=> 
        @debug "collection member after refresh"
        @trigger("after:refresh",models,query,options)

      _.extend component, 
        collection: container.getCollection() 
        getQuery: _.bind(container.getQuery, container)
        getQueryOptions: _.bind(container.getQueryOptions, container)

      if container.prepareQuery?
        _.extend component,
          prepareQuery: _.bind(container.prepareQuery, container)

  validateComponent: (component)->
    type = (component.type || component.ctype)

    return if  type is "collection" or 
               type is "collection_view" or
               type is "table" or
               type is "table_view" 

    throw "The MultiCollectionView expects to contain multiple collection views" 
