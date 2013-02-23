#= require_tree ./browse_source 
#= require_self
view = Docs.register "Docs.views.BrowseSource"
view.extends         "Luca.Container"

view.configuration
  autoBindEventHandlers: true
  events:
    "click .docs-component-list a.link" : "selectComponent"

view.contains
  component: "component_list"
,
  component: "component_details"

view.privateMethods

  index: ()->
    @selectComponent(@getComponentList().getCollection().at(0))

  show: (componentName)-> 
    component = @getComponentList().getCollection().detect (model)->
      model.get("class_name") is componentName

    return @index() unless component?

    @selectComponent(component)
    
  selectComponent: (e)->
    list    = @getComponentList()
    details = @getComponentDetails() 

    if Luca.isBackboneModel(e) 
      model = e
      index = list.getCollection().indexOf(model)
      row   = list.$("tr[data-index='#{ index }']")
    else
      $target   = @$(e.target)
      row       = $target.parents('tr').eq(0)
      index     = row.data('index')
      model     = list.getCollection().at(index) 

    list.$('tr').removeClass('info')
    row.addClass('info')
    details.load(model)

