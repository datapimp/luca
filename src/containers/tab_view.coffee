Luca.containers.TabView = Luca.containers.CardView.extend
  component_type: 'tab_view'

  className: 'luca-ui-tab-view-wrapper'

  components: []

  component_class: 'luca-ui-tab-panel'

  initialize: (@options={})->
    Luca.containers.CardView.prototype.initialize.apply @, arguments
