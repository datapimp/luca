#= require_tree ./browse_source 
#= require_self
view = Docs.register "Docs.views.BrowseSource"
view.extends         "Luca.Container"

view.configuration
  events:
    "click .docs-component-list a.link" : "selectComponent"

view.contains
  component: "component_list"
,
  component: "component_details"

view.privateMethods
  index: ()->
    @selectComponent(@getComponentList().getCollection().at(0))
    
  selectComponent: (e)->
    if Luca.isBackboneModel(e) 
      model = e
    else
      $target   = @$(e.target)
      row       = $target.parents('tr').eq(0)
      index     = row.data('index')
      model     = @getComponentList().getCollection().at(index) 

    @getComponentDetails().load(model)

