_.def("Sandbox.views.Builder").extends("Luca.core.Container").with
  name: "builder"
  id: "builder"

  components:[
    ctype: "builder_canvas"
    className: "builder-canvas"
  ,
    ctype: "container"
    bodyClassName:"row"
    topToolbar:
      buttons:[
        align:"left"
        label:"View"
        dropdown:[
          ["toggle:all","All"]
          ["toggle:collections","Collections"]
          ["toggle:models","Models"]
          ["toggle:views","Views"],
        ]
      ]
    components:[
      ctype:"panel"
      className:"span2"
    ,
      ctype: "builder_editor"  
      className:"span10"
    ]
  ]



  initialize: (@options={})->
    Luca.core.Container::initialize.apply(@, arguments)

    @state = new Backbone.Model
      canvasLayout: "horizontal-split"  

    @state.bind "change:canvasLayout", ()=>
      @$el.removeClass().addClass @state.get("canvasLayout")

  canvas: ()-> Luca("builder_canvas")
  editor: ()-> Luca("builder_editor")

  fitToScreen: ()->
    viewportHeight = $(window).height()
    half = viewportHeight * 0.5
    toolbarHeight = 0
    toolbarHeight += @$('.toolbar-container.top').height() * @$('.toolbar-container.top').length

    @canvas().$el.height( half - toolbarHeight )
    @editor().$el.height( half )
    @editor().setHeight( half )

  activation: ()->
    $('body .navbar').toggle()
    @fitToScreen()

  deactivation: ()->
    $('body .navbar').toggle()

  beforeRender: ()->
    Luca.core.Container::beforeRender?.apply(@, arguments)
    @$el.removeClass().addClass @state.get("canvasLayout")

