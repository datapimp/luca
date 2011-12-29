Sandbox.views.Navigation = Luca.View.extend 
  name: "sandbox_navigation"
  className: 'navigation'
  tagName: 'ul'

  events: 
    "click .navigation li.cardswitch" : "navigate"
    "click .modal" : "modal"

  navigate: (e)->
    me = my = $(e.currentTarget)
    slide = my.data('slide')
     
    @demo_container().activate( slide )
  
  activeDemo: ()-> @demo_container().getActiveComponent()

  debugMode: 'verbose'

  modal: ()->
    alert 'Coming Soon'

  demo_container: ()->
    Luca.cache('demo_container')

  render: ()->
    $(@el).html Luca.templates["navigation"]()
