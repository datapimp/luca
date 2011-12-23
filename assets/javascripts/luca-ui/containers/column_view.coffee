Luca.containers.ColumnView = Luca.core.Container.extend 
  component_type: 'column_view'

  className: 'luca-ui-column-view' 

  # components are other backbone views
  # which will each have their own separate
  # column.  these components will be have
  # render() called on them after the structural
  # contianers are added to the dom by this columnView
  components: []
  
  initialize: (@options)->
    Luca.core.Container.prototype.initialize.apply @,arguments

  # specify the layout in the form of
  # percentage widths of each column
  layout: undefined 
   
  prepare_layout: ()->
    @columnWidths = if @layout? then _( @layout.split('/') ).map((v)-> parseInt(v)) else @autoLayout()

    @columns = _( @columnWidths ).map (width,columnIndex) =>
      column =
        cssClass: 'luca-ui-column'
        cssStyles: 'float:left;'
        width: width 
        columnIndex: columnIndex 
        cssId: "#{ @cid }-#{ columnIndex }" 

      $(@el).append(JST["luca-ui/templates/containers/column"](column))

      column

  # by default, will set each column
  # to an equal ratio based on the number
  # of components contained in the view
  autoLayout: ()-> _( @components.length ).times ()=> parseInt( 100 / @components.length )
  
  # in general each different type of 'layout' will
  # have different settings to apply to each of the
  # components so that they fit within their proper
  # layout. In this case we just assign them to a column
  prepare_components: ()-> @assignColumns()
 
  assignColumns: ()->
    @components = _( @components ).map (object, index) =>
      column = @columns[ index ]
      object.el = object.renderTo = "##{ column.cssId }"
      object.parentEl = @el
      object

    @trigger "after:components", @, @components

# register for lazy creation later
Luca.register 'column_view', "Luca.containers.ColumnView"
