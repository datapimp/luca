Sandbox.Router = Luca.Router.extend
  routes:
    ""                : "default"
    "build"           : "build"
    "intro"           : "intro"
    "application"     : "inspector"

  default: ()->
    @app.navigate_to("pages").navigate_to "main"

  build: ()->
    @app.navigate_to("pages").navigate_to "build"

  intro: ()->
    @app.navigate_to("pages").navigate_to "intro"

  inspector: ()->
    inspector = Luca "application_inspector", new Luca.tools.ApplicationInspector()
    inspector.toggle()
