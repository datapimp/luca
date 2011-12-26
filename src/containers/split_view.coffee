Luca.containers.SplitView = Luca.core.Container.extend 
  layout: '100'

  component_type: 'split_view'

  className: 'luca-ui-split-view' 

  components: []
  
  initialize: (@options)->
    Luca.core.Container.prototype.initialize.apply @,arguments
    view = @
    @component_containers = _( @components ).map (component, componentIndex) =>
      @panel_config.apply view, [ component, componentIndex ]
  
  panelClass: 'luca-ui-panel'

  panel_config: (panel, panelIndex)->
    class: @panelClass
    id: "#{ @cid }-#{ panelIndex }"

  prepare_layout: ()->
    _( @component_containers ).each (container)=>
      $(@el).append "<div id='#{ container.id }' class='#{ container.class }' style='#{ container.style }' />"

  prepare_components: ()-> @assign_containers()

  assign_containers: ()->
    @components = _( @components ).map (object, index) =>
      panel = @component_containers[ index ]
      object.el = object.renderTo = "##{ panel.id }"
      object.parentEl = @el
      object

Luca.register 'split_view', "Luca.containers.SplitView"
