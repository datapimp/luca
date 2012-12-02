#= require ./config
#= require_tree ./util
#= require_tree ./templates
#= require_tree ./models
#= require_tree ./collections
#= require_tree ./views

#= require ./router
#= require ./application

#= require_self

<%= javascript_namespace %>.onReady ->
  (window.<%= javascript_namespace %>App = new <%= javascript_namespace %>Application()).boot();
