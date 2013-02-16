scrollable = Luca.register      'Luca.components.ScrollableTable'

scrollable.extends              'Luca.components.TableView'

scrollable.replaces             'Luca.components.GridView'

scrollable.publicConfiguration
  maxHeight: undefined

scrollable.privateMethods
  $scrollableWrapperEl: ()->
    @$el.parent('.scrollable-wrapper')

  setMaxHeight: ()->
    parent = @$scrollableWrapperEl()
    parent.css('overflow':'auto', 'max-height': @maxHeight)

  afterRender: ()->
    @$wrap 'scrollable-wrapper'
    @setMaxHeight()

scrollable.defines
  version: 1