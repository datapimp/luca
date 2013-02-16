#= require_self
#= require_tree ./templates
#= require ./framework
#= require ./config
#= require ./util
#= require ./core
#= require ./managers
#= require ./containers
#= require ./components

Backbone.View::make ||= (tagName, attributes, content)->
  el = document.createElement(tagName)
  if attributes 
    Backbone.$(el).attr(attributes)
  if content != null 
    Backbone.$(el).html(content)
  el
