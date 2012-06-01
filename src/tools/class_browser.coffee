_.def("Luca.tools.ClassBrowser").extends("Luca.core.Container").with

  name: "class_browser"

  className: "luca-class-browser row"

  beforeRender: ()->
    Luca.core.Container::beforeRender?.apply(@, arguments)

  prepareLayout: ()->
    @$append @make("div",class:"left-column span2")
    @$append @make("div",class:"right-column span10")

  prepareComponents: ()->
    @components[0].container = @$ '.left-column'
    @components[1].container = @$ '.right-column'

  afterComponents: ()->
    list = @components[0]
    detail = @components[1]

    list.bind "component:loaded", (model, response)->
      detail.loadComponent( model )

  components:[
    name: "class_browser_list"
    ctype: "class_browser_list"
  ,
    name: "class_browser_detail"
    ctype: "class_browser_detail"
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