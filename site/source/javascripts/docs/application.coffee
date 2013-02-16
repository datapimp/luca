app = Docs.register       "Docs.Application"
app.extends               "Luca.Application"

app.configuration
  name: "DocsApp"
  fluid: true
  el: "#viewport"

app.contains
  component: "home"

app.defines
  beforeRender: ()->
    @$el.append (new Docs.views.TopNavigation() ).render().el
    Luca.Application::beforeRender?.apply(@, arguments)

app.register()