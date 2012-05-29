_.def("Luca.tools.ClassBrowser").extends("Luca.core.Container").with

  name: "class_browser"

  className: "luca-class-browser row"

  beforeRender: ()->
    Luca.core.Container::beforeRender?.apply(@, arguments)

  prepareLayout: ()->
    @$append @make("div",class:"left-column span3")
    @$append @make("div",class:"right-column span9")

  prepareComponents: ()->
    @components[0].container = @$ '.left-column'
    @components[1].container = @$ '.right-column'

  components:[
    name: "class_browser_directory"
    markup: "hi"
  ,
    name: "class_browser_detail"
    markup: "detail"
  ]

  bottomToolbar:
    buttons:[
      label: "Add New"
      icon: "plus"
      color: "primary"
      white: true
      align: 'right'
    ]

  initialize: (@options={})->
    Luca.core.Container::initialize.apply(@, arguments)