_.def("Sandbox.views.ComponentList").extends("Luca.components.CollectionView").with
  name: "component_list"
  id: "component_list"
  className:"span3"
  collection:"components"
  itemTagName:"div"
  itemRenderer: (item, model, index)->
    Luca.util.make("a",{"data-index":index}, model.className() )

  autoBindEventHandlers: true

  events:
    "click div.collection-item a" : "clickHandler"

  clickHandler: (e)->
    e.preventDefault()
    me = my = $( e.target )
    component = @collection.at( my.data('index') )
    @trigger "selected", component