Sandbox.Router = Luca.Router.extend
  routes:
    ""                : "default"
    "build"           : "build"
    "intro"           : "intro"
    "application"     : "inspector"
    "docs"            : "docs"
    "docs/:section"   : "docs"

  default: ()->
    @app.navigate_to("pages").navigate_to "main"

  build: ()->
    @app.navigate_to("pages").navigate_to "build"

  docs: (section="docs_index")->
    @app.navigate_to("docs").navigate_to(section)

  intro: ()->
    @app.navigate_to("pages").navigate_to "intro"

  inspector: ()->
    inspector = Luca "application_inspector", new Sandbox.views.ApplicationInspector() 
    inspector.toggle()
