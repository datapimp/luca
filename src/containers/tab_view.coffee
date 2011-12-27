Luca.containers.TabView = Luca.containers.CardView.extend
  component_type: 'tab_view'

  className: 'luca-ui-tab-view'

  components: []

  initialize: (@options={})->
    _.extend @, @options
    Luca.containers.CardView.prototype.initialize.apply @, arguments

  afterComponents: ()->
