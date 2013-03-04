#= require ./config
#= require_tree ./lib
#= require_tree ./models
#= require_tree ./collections
#= require_tree ./views
#= require ./application

Test.onReady ()->
  window.TestApp = new Test.Application()
  window.TestApp.boot()