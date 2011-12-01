window.LucaApp = {}

window.LucaApp.Container = Luca.components.Container.extend
  el: '#container'

  layout: 'card' 
  
  items: [{
    component_type: 'grid',
    css_id: 'grid_container'
  }]

class ExampleApplication
  views: {}
  constructor: (@options)->
    @views.card_layout = new LucaApp.Container

$ -> window.app = new ExampleApplication
