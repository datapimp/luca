view = Docs.register    "Docs.views.ComponentDetails"
view.extends            "Luca.Container"

view.configuration
  rowFluid: true

view.contains
  role: "documentation"
  span: 6
,
  role: "source"
  tagName: "pre"
  className: "pre-scrollable"
  span: 6

view.defines
  # Loads a model from the FrameworkDocumentation 
  # collection, and displays information about it in
  # the documentation and source panels
  load: (model)->
    @getDocumentation().$el.html( model.get("header_documentation") )
    @getSource().$el.html( model.get('source_file_contents'))
