Luca.containers.ColumnView = Luca.core.Container.extend
  componentType: 'column_view'

  className: 'luca-ui-column-view'

  components: []

  initialize: (@options={})->
    Luca.core.Container.prototype.initialize.apply @, arguments
    @setColumnWidths()
  
  componentClass: 'luca-ui-column'

  containerTemplate: "containers/basic"

  autoColumnWidths: ()-> 
    widths = []

    _( @components.length ).times ()=> 
      widths.push( parseInt( 100 / @components.length ) )

    widths

  setColumnWidths: ()->
    @columnWidths = if @layout? 
      _( @layout.split('/') ).map((v)-> parseInt(v) ) 
    else 
      @autoColumnWidths()

    @columnWidths = _( @columnWidths ).map (val)-> "#{ val }%"
  
  beforeComponents: ()->
    @debug "column_view before components"
    _( @components ).each (component)->
      component.ctype ||= "panel_view"

  beforeLayout: ()->
    @debug "column_view before layout"

    _(@columnWidths).each (width,index) =>
      @components[index].float = "left"
      @components[index].width = width

    Luca.core.Container.prototype.beforeLayout?.apply @, arguments

Luca.register 'column_view', "Luca.containers.ColumnView"
