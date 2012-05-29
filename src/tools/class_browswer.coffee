_.def("Luca.tools.ClassBrowser").extends("Luca.core.Container").with
  name: "class_browser"
  initialize: (@options={})->
    Luca.core.Container::initialize.apply(@, arguments)