app = Docs.register       "Docs.Application"
app.extends               "Luca.Application"

app.configuration
<<<<<<< Updated upstream
  name: "DocsApp"
  fluid: true
  el: "#viewport"

app.contains
  bodyTemplate: "home"

app.defines
  beforeRender: ()->
    @$el.append (new Docs.views.TopNavigation() ).render().el
    Luca.Application::beforeRender?.apply(@, arguments)
=======
  collectionManager: 
    initialCollections:[
      "framework_documentation"
    ]
  router: "Docs.Router"
  routes:
    "":                 "home#index"
    "docs":           "browse_source#index"
    "get-started":      "getting_started#index"

app.contains
  component: "home"
,
  component: "documentation"
,
  component: "browse_source"
,
  name: "getting_started"
  type: "page"
  layout: "pages/getting_started"
  index: _.once ()->
    @$('pre').addClass('prettyprint')
    window.prettyPrint() 
>>>>>>> Stashed changes

app.register()