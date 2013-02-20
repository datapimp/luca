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
  bodyTemplate: "component_documentation"
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
    prototype = Luca.util.resolve( model.get("class_name") )?.prototype || {}

    source.$('.table tbody').empty() 
    documentation.$el.show().empty()
    documentation.$el.append("<h2>#{ model.get('class_name') }</h2>")
    documentation.$el.append("<div class='header-documentation'>#{ model.get('header_documentation') }</div>")

    source.$el.show()
    source.$('.methods, .properties').hide()

    groups = model.documentation().details

    unless _.isEmpty(groups?.publicProperties)
      list = source.$('.public.properties').show().find('.table tbody')
      for method, details of groups.publicProperties when not _.isFunction(prototype[method])
        details ||= {}
        list.append "<tr><td>#{ method }</td><td></td><td>#{ details.documentation || "" }</td></tr>"

    unless _.isEmpty(groups?.privateProperties)
      list = source.$('.private.properties').show().find('.table tbody')
      for method, details of groups.privateProperties when not _.isFunction(prototype[method])
        details ||= {}
        list.append "<tr><td>#{ method }</td><td></td><td>#{ details.documentation || "" }</td></tr>"
         
    unless _.isEmpty(groups?.publicMethods)
      list = source.$('.public.methods').show().find('.table tbody')
      for method, details of groups.publicMethods when _.isFunction(prototype[method])
        details ||= {}
        list.append "<tr><td>#{ method }</td><td></td><td>#{ details.documentation || "" }</td></tr>"

    unless _.isEmpty(groups?.privateMethods)
      list = source.$('.private.methods').show().find('.table tbody')
      for method, details of groups.privateMethods when _.isFunction(prototype[method])
        details ||= {}
        list.append "<tr><td>#{ method }</td><td></td><td>#{ details.documentation || "" }</td></tr>"
         
    source.$('pre').html( model.contentsWithoutHeader() )

    @prettyPrint()

  # Applies syntax highlighting to all pre elements
  prettyPrint: ()-> 
    @$('pre').addClass('prettyprint')
    window.prettyPrint?()
