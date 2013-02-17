view = Docs.register    "Docs.views.ComponentDetails"
view.extends            "Luca.Container"

view.configuration
  rowFluid: true

view.contains
  role: "documentation"
  span: 5
,
  role: "source"
  tagName: "pre"
  className: "pre-scrollable"
  span: 7

view.defines
  afterRender: ()->
    @getSource().$el.hide()
  # Loads a model from the FrameworkDocumentation 
  # collection, and displays information about it in
  # the documentation and source panels
  load: (model)->
    @getSource().$el.show()
    @getDocumentation().$el.html( model.get("header_documentation") )
    @getSource().$el.html( model.get('source_file_contents'))
    @$('pre').addClass('prettyprint')
    window.prettyPrint?()
