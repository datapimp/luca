Sandbox.Router = Luca.Router.extend
  routes:
    ""          : "default"
    "sandbox"   : "sandbox"

  default: ()->
    @app.navigate_to("pages").navigate_to "main"

  sandbox: ()->
    @app.navigate_to("pages").navigate_to "sandbox"
