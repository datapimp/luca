Luca.define("Luca.containers.BasicPanel").extends("Luca.core.Container").with
  name: "basic_panel"

  top_toolbar: {}

  bottom_toolbar: {}

  initialize: (@options={})->
    @_superClass()::initialize.apply(@, arguments)

  beforeRender: ()->
    @renderToolbars()

  renderToolbars: ()->
    # IMPLEMENT