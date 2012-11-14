multiView = Luca.define     "Luca.components.MultiCollectionView"
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

multiView.behavesAs         "LoadMaskable",
                            "Filterable",
                            "Paginatable"

multiView.defaultsTo
  version: 1

  stateful: true

  defaultState:
    activeView: 0

  viewContainerClass: "luca-ui-multi-view-container"

  initialize: (@options={})->
    @components ||= @views

    Luca.containers.CardView::initialize.apply(@, arguments) 

    validateComponent( view ) for view in @components    

    @on "collection:change", @refresh, @
    @on "after:card:switch", @refresh, @
    @on "before:components", propagateCollectionComponents, @

  refresh: ()->
    @activeComponent()?.trigger("collection:change")

  getQuery: Luca.components.CollectionView::getQuery
  getQueryOptions: Luca.components.CollectionView::getQueryOptions
  getCollection: Luca.components.CollectionView::getCollection
#### Private Helpers

propagateCollectionComponents = ()->
  container = @

  # in the multi view will share the same
  # collection, filter state, pagination options, etc
  for component in @components
    _.extend component, 
      collection: @collection
      getQuery: container.getQuery
      getQueryOptions: container.getQueryOptions

validateComponent = (component)->
  type = (component.type || component.ctype)

  return if  type is "collection" or 
             type is "collection_view" or
             type is "table" or
             type is "table_view" 

  throw "The MultiCollectionView expects to contain multiple collection views" 


Luca.components.MultiCollectionView.defaultTopToolbar = 
  group: true
  selectable: true
  buttons:[
    icon: "list-alt"
    label: "Table View"
    eventId: "toggle:table:view"
  ,
    icon: "th"
    label: "Icon View"
    eventId: "toggle:icon:view"
  ]  