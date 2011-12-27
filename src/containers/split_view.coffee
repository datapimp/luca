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
    style_declarations = []
    
    style_declarations.push "height: #{ (if _.isNumber(panel.height) then panel.height + 'px' else panel.height ) }" if panel.height
    style_declarations.push "width: #{ (if _.isNumber(panel.width) then panel.width + 'px' else panel.width ) }" if panel.width
    
    config = 
      class: @panelClass
      id: "#{ @cid }-#{ panelIndex }"
      style: style_declarations.join(';')

  prepare_layout: ()->
    _( @component_containers ).each (container)=>
      $(@el).append "<div id='#{ container.id }' class='#{ container.class }' style='#{ container.style }' />"

  prepare_components: ()-> @assign_containers()

  assign_containers: ()->
    @components = _( @components ).map (object, index) =>
      panel = @component_containers[ index ]
      object.container = object.renderTo = "##{ panel.id }"
      object.parentEl = @el
      object

Luca.register 'split_view', "Luca.containers.SplitView"
