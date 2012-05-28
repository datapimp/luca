_.def('Luca.containers.ColumnView').extends('Luca.core.Container').with
  componentType: 'column_view'

  className: 'luca-ui-column-view'

  components: []

  initialize: (@options={})->
    Luca.core.Container::initialize.apply @, arguments
    @setColumnWidths()

  componentClass: 'luca-ui-column'

  containerTemplate: "containers/basic"

  appendContainers: true

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

  beforeLayout: ()->
    @debug "column_view before layout"

    _(@columnWidths).each (width,index) =>
      @components[index].float = "left"
      @components[index].width = width

    Luca.core.Container::beforeLayout?.apply @, arguments