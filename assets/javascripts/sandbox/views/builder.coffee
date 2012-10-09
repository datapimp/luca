_.def("Sandbox.views.Builder").extends("Luca.core.Container").with
  name: "builder"
  id: "builder"
  defaultCanvasPosition: 'below'
  componentEvents:
    "editor_container toggle:search:option" : "toggleSearchOption"

  components:[
    ctype: "container"
    name:"editor_container"
    additionalClassNames: 'row-fluid'
    className: "builder-editor-container"
    styles: 
      position: "absolute"
      
    bottomToolbar:
      buttons:[
        group: true
        align: "left"
        buttons:[
          eventId: "toggle:search:option"
          icon:"search"
          classes:"search-options component-search"
        ,
          eventId: "toggle:search:option"
          icon: "list-alt"
          classes: "search-options saved-components"
        ]
      ,
        eventId:"toggle:settings"
        icon: "cog"
        align: 'right'
      ]
    components:[
      ctype: "builder_editor"  
      name: "builder_editor"
      className:"builder-editor"
      styles: 
        position: "relative"
        width: "100%"
        top: "0"
        left: "0"
    ,
      type: "project_browser"
      className:"project-browser"
      name: "project_browser"
      styles: 
        position: "relative"
        width: "30%"
        top: "0"
        left: "0"
    ]
  ]

  initialize: (@options={})->
    Luca.core.Container::initialize.apply(@, arguments)

    _.bindAll @, "toggleSearchOption"

    canvas = type: "builder_canvas", className: "builder-canvas"

    @state = new Backbone.Model
      canvasLayout: "horizontal-split"  
      canvasPosition: (@defaultCanvasPosition || "above")
      ratio: 0.4

    @state.bind "change:canvasLayout", ()=>
      @$el.removeClass().addClass @state.get("canvasLayout")

    if @state.get('canvasPosition') is "above"
      @components.unshift( canvas )
    else
      @components.push( canvas )



  canvas: ()-> 
    Luca("builder_canvas")

  editor: ()-> 
    Luca("builder_editor")

  componentList: ()-> 
    Luca("component_list")

  toggleSearchOption: (button)->
    button.toggleClass('active')

  # TODO
  # Find a pure CSS solution this is garbage.
  fitToScreen: ()->
    @$el.addClass("canvas-position-#{ @state.get('canvasPosition') }")

    viewportHeight = $(window).height()
    half = viewportHeight * @state.get('ratio') 

    toolbarHeight = 0
    toolbarHeight += @$('.toolbar-container.top').height() * @$('.toolbar-container.top').length

    filterHeight = 0
    filterHeight += @$('.component-list-filter-form').height()

    @canvas().$el.height( half - toolbarHeight - 40 )

    @componentList().$el.height( half - filterHeight - 50 )

    @editor().$el.height( half )
    @editor().setHeight( half )

  activation: ()->
    @fitToScreen()

  deactivation: ()->
    # implement

  afterRender: ()->
    @_super "afterRender", @, arguments
    componentList = Luca("component_list")
    componentList.on "selected", (component)->
      Luca("builder_editor").setValue( component.get('source') )
      Luca("builder_editor").state.set('currentMode','coffeescript')

    @$('.component-list-filter-form input[type="text"]').on "keydown", ()->
      componentList.filterByName $(this).val()

    @$('.component-list-filter-form input[type="text"]').on "keyup", ()->
      val = $(this).val()
      componentList.filterByName('') if val.length is 0

  beforeRender: ()->
    Luca.core.Container::beforeRender?.apply(@, arguments)
    @$el.removeClass().addClass @state.get("canvasLayout")

