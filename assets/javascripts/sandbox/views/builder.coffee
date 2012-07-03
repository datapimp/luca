_.def("Sandbox.views.Builder").extends("Luca.core.Container").with
  name: "builder"
  id: "builder"
  components:[
    ctype: "builder_canvas"
    className: "builder-canvas"
  ,
    ctype: "container"
    name:"editor_container"
    bodyClassName:"row-fluid" 

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

    componentEvents:
      "component_list selected" : "onComponentSelection"

    components:[
      ctype:"component_list"
      name: "component_list"
      className:"span3"
      beforeRender: ()->
        @collection.fetch()
    ,
      ctype: "builder_editor"  
      className:"span9 builder-editor-container"
      styles:
        "margin-left":"0px"
        "width":"76%"
    ]

    onComponentSelection: (component)->
      Luca("builder_editor").setValue( component.get('source') )
      Luca("builder_editor").state.set('currentMode','coffeescript')
      Luca("builder_editor").updateToggleSourceButton()
  ]


  initialize: (@options={})->
    Luca.core.Container::initialize.apply(@, arguments)

    @state = new Backbone.Model
      canvasLayout: "horizontal-split"  

    @state.bind "change:canvasLayout", ()=>
      @$el.removeClass().addClass @state.get("canvasLayout")

  canvas: ()-> Luca("builder_canvas")
  editor: ()-> Luca("builder_editor")
  componentList: ()-> Luca("component_list")

  fitToScreen: ()->
    viewportHeight = $(window).height()
    half = viewportHeight * 0.5
    toolbarHeight = 0
    toolbarHeight += @$('.toolbar-container.top').height() * @$('.toolbar-container.top').length

    @canvas().$el.height( half - toolbarHeight - 40 )

    @componentList().$el.height( half )
    @editor().$el.height( half )
    @editor().setHeight( half - 50 )

  activation: ()->
    @fitToScreen()

  deactivation: ()->

  beforeRender: ()->
    Luca.core.Container::beforeRender?.apply(@, arguments)
    @$el.removeClass().addClass @state.get("canvasLayout")

