#= require ./config
#= require_tree ./lib
#= require_tree ./templates
#= require ./models
#= require ./collections
#= require ./views
#= require ./application
#= require_self

Docs.onReady ()->
  window.DocsApp = new Docs.Application()
  DocsApp.boot()