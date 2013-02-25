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
    "get-started":                      "getting_started#index"
    "examples":                         "examples_browser#index"
    "examples/:example_name/:section":  "examples_browser#show"
    "examples/:example_name":           "examples_browser#show"
    "component_editor":                 "component_editor#index"

  stateChangeEvents:
    "page": "onPageChange"

app.privateMethods
  mainNavElement: ()->
    @_mainNavEl ||= $('#main-nav ul.nav')

  afterRender: ()->
    Luca.Application::afterRender?.apply(@, arguments)
    if window.location.host.match /localhost/
      @codeSyncManager = new Docs.CodeSyncManager({}, host:"//localhost:9292/faye", channel:"/luca-code-sync")
      @codeSyncManager.trigger("ready")

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
  component: "component_editor"
,
  name: "getting_started"
  type: "page"
  layout: "pages/getting_started"
  index: _.once ()->
    @$('pre').addClass('prettyprint')
    window.prettyPrint() 

app.register()