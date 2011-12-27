Luca.containers.ColumnView = Luca.containers.SplitView.extend
  component_type: 'column_view'

  className: 'luca-ui-column-view'

  components: []

  initialize: (@options={})->
    Luca.containers.SplitView.prototype.initialize.apply @,arguments
  
  panelClass: 'luca-ui-column'

  autoLayout: ()-> 
    _( @components.length ).times ()=> parseInt( 100 / @components.length )

  setColumnWidths: ()->
    @columnWidths = if @layout? 
      _( @layout.split('/') ).map((v)-> parseInt(v) ) 
    else 
      @autoLayout()

    @columnWidths = _( @columnWidths ).map (val)-> "#{ val }%"

  beforeLayout: ()->
    @setColumnWidths()

    _(@columnWidths).each (width,index) =>
      @component_containers[index].style = "float:left; width: #{ width };" 

Luca.register 'column_view', "Luca.containers.ColumnView"
