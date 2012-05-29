_.def("Luca.tools.ClassBrowserList").extends("Luca.View").with
  tagName: "ul"
  className: "nav nav-list"

  initialize: (@options={})->
    @deferrable = @collection = new Luca.collections.Components()

  attach: _.once( Luca.View::$attach )

  render: ()->
    @attach()
