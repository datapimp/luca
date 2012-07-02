Sandbox.Router = Luca.Router.extend
  routes:
    ""                : "default"
    "build"           : "build"
    "intro"           : "intro"

  default: ()->
    @app.navigate_to("pages").navigate_to "main"

  build: ()->
    @app.navigate_to("pages").navigate_to "build"

  intro: ()->
    @app.navigate_to("pages").navigate_to "intro"
