app = Docs.register       "Docs.Application"
app.extends               "Luca.Application"
app.configuration
  el: "#viewport"
  fluid: true
  fullscreen: true
  applyWrapper: false
  name: "DocsApp"

app.configuration
  collectionManager: 
    initialCollections:[
      "framework_documentation"
    ]
  router: "Docs.Router"
  routes:
    "":                 "home#index"
    "docs":             "browse_source#index"
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

app.register()