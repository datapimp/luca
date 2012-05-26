_.def("Luca.containers.BasicPanel").extends("Luca.core.Container").with
  name: "basic_panel"

  top_toolbar: {}

  bottom_toolbar: {}

  initialize: (@options={})->
    Luca.core.Container::initialize.apply(@, arguments)

  beforeRender: ()->
    @renderToolbars()

  renderToolbars: ()->
    # IMPLEMENT