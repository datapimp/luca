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
      "luca_documentation"
      "docs_documentation"
    ]

  router: "Docs.Router"
  
  routes:
    "":                                 "home#index"
    "docs":                             "browse_source#index"
    "docs/:component_name":             "browse_source#show"
    "get-started":                      "getting_started#index"
    "examples":                         "examples_browser#index"
    "examples/:example_name/:section":  "examples_browser#show"
    "examples/:example_name":           "examples_browser#show"

app.contains
  component: "home"
,
  component: "browse_source"
,
  component: "examples_browser"
,
  name: "getting_started"
  type: "page"
  layout: "pages/getting_started"
  index: _.once ()->
    @$('pre').addClass('prettyprint')
    window.prettyPrint() 

app.register()