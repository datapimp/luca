view = Docs.register    "Docs.views.ComponentDetails"
view.extends            "Luca.Container"

view.configuration
  rowFluid: true

view.contains
  role: "documentation"
  span: 5
,
  role: "source"
  type: "panel"
  bodyTagName: "pre"
  bodyClassName: "pre-scrollable"
  span: 7

view.defines
  afterRender: ()->
    @getSource().$el.hide()

  # Loads a model from the FrameworkDocumentation 
  # collection, and displays information about it in
  # the documentation and source panels
  load: (model)->
    source = @getSource()
    documentation = @getDocumentation()

    documentation.$el.show().empty()
    documentation.$el.append("<h2>#{ model.get('class_name') }</h2>")
    documentation.$el.append("<div class='header-documentation'>#{ model.get('header_documentation') }</div>")

    source.$el.empty().show()
    source.$el.prepend("<h2>Source</h2>")
    source.$bodyEl().append( model.get("source_file_contents") )
    @prettyPrint()

  # Applies syntax highlighting to all pre elements
  prettyPrint: ()-> 
    @$('pre').addClass('prettyprint')
    window.prettyPrint?()
