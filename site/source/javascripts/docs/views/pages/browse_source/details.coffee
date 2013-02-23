view = Docs.register    "Docs.views.ComponentDetails"
view.extends            "Luca.Container"

view.configuration
  rowFluid: true

view.contains
  role: "documentation"
  span: 5
  loadComponent: (model)->
    @$el.empty()
    @$el.append("<h2>#{ model.get('class_name') }</h2>")
    @$el.append("<div class='header-documentation'>#{ model.get('header_documentation') }</div>")
,
  type: "component_documentation"
  role: "details"
  displaySource: true
  span: 7

view.defines
  afterRender: ()->
    @getDetails().$el.hide()
    @getDocumentation().$el.hide()

  load: (model)->
    @getDetails().$el.show()
    @getDocumentation().$el.show()

    @getDetails().loadComponent(model)
    @getDocumentation().loadComponent(model)

    @prettyPrint()

  # Applies syntax highlighting to all pre elements
  prettyPrint: ()-> 
    @$('pre').addClass('prettyprint')
    window.prettyPrint?()
