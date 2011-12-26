Luca.containers.ColumnView = Luca.containers.SplitView.extend
  component_type: 'column_view'

  class_name: 'luca-ui-column-view'

  components: []

  initialize: (@options)->
    _.extend @, @options
    Luca.containers.SplitView.prototype.initialize.apply @,arguments
  
  panelClass: 'luca-ui-column'

  autoLayout: ()-> 
    _( @components.length ).times ()=> parseInt( 100 / @components.length )

  beforeLayout: ()->
    @columnWidths = if @layout? then _( @layout.split('/') ).map((v)-> parseInt(v)) else @autoLayout()
    _(@columnWidths).each (width,index) =>
      @component_containers[index].style = "float:left; width: #{ width }px;" 

Luca.register 'column_view', "Luca.containers.ColumnView"
