_.def("Sandbox.views.ComponentList").extends("Luca.components.CollectionView").with
  name:                     "component_list"
  id:                       "component_list"
  collection:               "components"
  itemTagName:              "div"
  autoBindEventHandlers: true
  events:
    "click div.collection-item a" : "clickHandler"

  itemRenderer: (item, model, index)->
    Luca.util.make("a",{"data-index":index}, model.className() )

  filterByName: (name)->
    models = @collection.query
      className:
        $likeI:name

    @collection.reset( models, silent: true )
    @refresh()

    if name?.length is 0 
      @resetToDefault()

  resetToDefault: ()->
    @collection.reset( @initialComponents, silent: true )
    @refresh()

  beforeRender: ()->
    success = (collection, response)=>
      @initialComponents = response

    @collection.fetch(success: success)  

  clickHandler: (e)->
    e.preventDefault()
    me = my = $( e.target )
    component = @collection.at( my.data('index') )
    @trigger "selected", component