#= require ./config
#= require_tree ./lib
#= require_tree ./templates
#= require ./models
#= require ./collections
#= require ./views
#= require ./application
#= require_self

Docs.onReady ()->
  DocsApp = new Docs.Application()
  DocsApp.boot()
