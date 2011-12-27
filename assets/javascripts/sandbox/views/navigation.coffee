Sandbox.views.Navigation = Backbone.View.extend
  name: "sandbox_navigation"
  className: '.navigation'
  tagName: 'ul'

  events: 
    "click .navigation li.cardswitch" : "navigate"
    "click .modal" : "modal"

  navigate: (e)->
    me = my = $(e.currentTarget)
    slide = my.data('slide')

  modal: ()->

  render: ()->
    $(@el).html Luca.templates["navigation"]()
