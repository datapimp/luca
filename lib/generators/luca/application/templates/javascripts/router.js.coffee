_.def('<%= javascript_namespace %>.Router').extends('Luca.Router').with

  routes:
    "" : "default"

  default: ()->
    @app.navigate_to("pages").navigate_to("main")
