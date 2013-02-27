
app = Docs.register       "Docs.Application"
app.extends               "Luca.Application"
app.configuration
  version: 1
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
    "examples":                         "examples_browser#index"
    "examples/:example_name/:section":  "examples_browser#show"
    "examples/:example_name":           "examples_browser#show"
    "component_editor":                 "component_editor#index"

    "get-started":                      "getting_started#index"
    "code-sync":                        "code_sync#index"
    "documentation-generator":          "documentation_generator#index"
    "free-persistence":                 "free_persistence#index"
  stateChangeEvents:
    "page": "onPageChange"

app.privateMethods
  mainNavElement: ()->
    @_mainNavEl ||= $('#main-nav ul.nav')

  afterRender: ()->
    Luca.Application::afterRender?.apply(@, arguments)
    app = @
    if window.location.host.match(/localhost/)
      console.log "loading...", "/app/assets/javascripts/vendor/luca-development.min.js"
      Luca.util.loadScript "/app/assets/javascripts/vendor/luca-development.min.js", _.delay ()->
        Luca.CodeSyncManager.setup.call(app)
      , 20

  _onPageChange: _.debounce (state, newPage)->
    $('li', @mainNavElement()).removeClass 'active'
    $("li[data-page='#{ newPage }']", @mainNavElement()).addClass 'active'
  , 10

app.contains
  component: "home"
,
  component: "browse_source"
,
  component: "examples_browser"
,
  name: "pages"
  type: "controller"
  defaults:
    type: "page"
    index: _.once ()->
      @$('pre').addClass('prettyprint')
      window.prettyPrint()  
  components:[
    name: "getting_started"
    layout: "pages/getting_started"
  ,
    name: "code_sync"
    layout: "pages/code_sync"
  ,
    name: "documentation_generator"
    layout: "pages/documentation_generator"
  ,
    name: "free_persistence"
    layout: "pages/free_persistence"
  ]


app.register()