Luca.layouts.CardLayout = Luca.components.Layout.extend 

  initialize: (@options={})->
    @render() unless not @deferredRender

  activeItem: 0

  component_type: 'card_layout'

  deferredRender: false

  setActiveItem: (index)->
    @trigger "cardchange", index, @items[ index ] 
    @activeItem = index

  getActiveItem: ()-> @items[ @activeItem ]

  render: ()->
    console.log "Rendering Card Layout to #{ @el }"
    _( @items ).each (item) =>
      item_id = if item.css_id? then item.css_id else "element-#{ _.uniqueId() }"
      item.el = "##{ item_id }"

      $(@el).append("<div id='#{ item_id }' class='luca-card' style='display:none;'></div>")



