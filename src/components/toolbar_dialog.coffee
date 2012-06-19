_.def("Luca.components.ToolbarDialog").extends("Luca.View").with
  className:"luca-ui-toolbar-dialog span well"

  styles:
    "position" : "absolute"
    "z-Index" : "3000"
    "float" : "left"

  initialize: (@options={})->
    @_super("initialize", @, arguments)

  createWrapper: ()->
    @make "div",
      class: "component-picker span4 well"
      style:
        "position: absolute; z-index:12000"

  show: ()->
    @$el.parent().show()

  hide: ()->
    @$el.parent().hide()

  toggle: ()->
    @$el.parent().toggle()
