app = Docs.register       "Docs.Application"
app.extends               "Luca.Application"
app.configuration
  el: "#viewport"
  fluid: true
  fullscreen: false
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
    "source":     "source#index"

app.contains
  component: "home"
,
  component: "documentation"
,
  component: "source"

app.register()