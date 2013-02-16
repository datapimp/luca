app = Docs.register       "Docs.Application"
app.extends               "Luca.Application"
app.configuration
  el: "#viewport"
  fluid: true
  fullscreen: false
  applyWrapper: false
  name: "DocsApp"

app.configuration
  router: "Docs.Router"
  routes:
    "":           "home"
    "docs":       "documentation#index"

app.contains
  component: "home"
,
  component: "documentation"

app.register()