page = Docs.register "Docs.views.ExamplesBrowser"
page.extends         "Luca.containers.TabView"

page.contains
  title: "API Browser"
  type: "api_browser"
  name: "api_browser"
  firstActivation: _.once ()->
    @runExample()
    console.log "API Browser First Activated"

page.privateConfiguration
  activeCard: 0
  tab_position: "left"

page.publicMethods
  show: (exampleName)->
    true

  index: ()->
    @activate(0)

page.register()