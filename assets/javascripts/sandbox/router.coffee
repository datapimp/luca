Sandbox.Router = Luca.Router.extend
  routes:
    ""               : "default"
    "class_browser"   : "class_browser"
    "component_tester"   : "component_tester"
    "build" : "build"

  default: ()->
    @app.navigate_to("pages").navigate_to "main"

  class_browser: ()->
    @app.navigate_to("pages").navigate_to "class_browser"

  component_tester: ()->
    @app.navigate_to("pages").navigate_to "component_tester"

  build: ()->
    @app.navigate_to("pages").navigate_to "build"
