Luca.core.Container = Luca.View.extend 
  hooks:[
    "before:components",
    "before:layout",
    "after:components",
    "after:layout"
  ]

  className: 'luca-ui-container'

  rendered: false
  
  component_class: 'luca-ui-panel'

  components: []

  component_elements: ()-> $(".#{ @component_class }", @el)

  initialize: (@options={})->
    _.extend @, @options
    _.bindAll @, "index_components"

    @setupHooks( Luca.core.Container.prototype.hooks )

    Luca.View.prototype.initialize.apply @, arguments
  
  do_layout: ()->
    @trigger "before:layout", @
    @prepare_layout()    
    @trigger "after:layout", @

  do_components: ()->
    @trigger "before:components", @, @components
    @prepare_components()
    @create_components()
    @render_components()
    @trigger "after:components", @, @components

  prepare_layout: ()-> 
    console.log @component_type, "should implement its own prepare layout"
  
  prepare_components: ()->
    console.log @component_type, "should implement its own prepare components method"
  
  create_components: ()->
    map = @component_index = 
      name_index: {}
      cid_index: {}

    @components = _( @components ).map (object, index)=>
      component = if _.isObject( object ) and object.ctype? then Luca.util.LazyObject( object ) else object

      # if we're using base backbone views, then they don't extend themselves
      # with their passed options, so this is a workaround
      if !component.renderTo and component.options.renderTo
        component.container = component.renderTo = component.options.renderTo
      
      if map and component.cid?
        map.cid_index[ component.cid ] = index
      
      if map and component.name?
        map.name_index[ component.name ] = index

      component
  
  findComponentByName: (name, deep=false)-> @findComponent name, "name_index", deep
  
  findComponentById: (id, deep=false)-> @findComponent id, "cid_index", deep

  findComponent: (needle, haystack="name", deep=false)->
    position = @component_index[ haystack ][ needle ]
    component = @components[ position ]

    return component if component
    
    if deep is true
      sub_container = _( @components ).detect (component)-> component?.findComponent?(needle, haystack, true)
      sub_container?.findComponent?(needle, haystack, true)

  component_names: ()->
    _( @component_index.name_index ).keys()

  render_components: (@debugMode="")->
    _(@components).each (component)=> 
      component.getParent = ()=> @ 
      $(component.renderTo).append $(component.el)
      component.render()
  
  beforeRender: ()->
    @do_layout() 
    @do_components()
  
  getComponent: (needle)-> 
    @components[ needle ]

  root_component: ()-> 
    !@getParent?

  getRootComponent: ()-> 
    if @root_component() then @ else @getParent().getRootComponent()
