Sandbox.Router = Luca.Router.extend
  routes:
    ""                : "default"
    "class_browser"   : "class_browser"

  default: ()->
    @app.navigate_to("pages").navigate_to "main"

  class_browser: ()->
    @app.navigate_to("pages").navigate_to "class_browser"
