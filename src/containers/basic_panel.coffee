_.def("Luca.containers.BasicPanel").extends("Luca.core.Container").with
  className: "luca-ui-basic-panel"

  name: "basic_panel"

  topToolbar: undefined

  bottomToolbar: undefined

  layout: "basic_panel"

  renderToEl: ()->
    @$('.panel-body')

  topToolbarContainer: ()->
    @$('.top-toolbar-container')

  bottomToolbarContainer: ()->
    @$('.bottom-toolbar-container')

  initialize: (@options={})->
    Luca.core.Container::initialize.apply(@, arguments)

  beforeRender: ()->
    Luca.core.Container::beforeRender?.apply(@, arguments)
    @renderToolbars()

  renderToolbars: ()->
    if @topToolbar?
      @topToolbar.ctype ||= "panel_toolbar"
      @topToolbar = Luca.util.lazyComponent( @topToolbar )
      @topToolbarContainer().append( @topToolbar.render().el )

    if @bottomToolbar?
      @bottomToolbar.ctype ||= "panel_toolbar"
      @bottomToolbar = Luca.util.lazyComponent( @bottomToolbar )
      @bottomToolbarContainer().append( @bottomToolbar.render().el )
