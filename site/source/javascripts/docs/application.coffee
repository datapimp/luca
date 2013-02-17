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
    "":           "home#index"
    "docs":       "documentation#index"
    "source":     "browse_source#index"

app.contains
  component: "home"
,
  component: "documentation"
,
  component: "browse_source"

app.register()