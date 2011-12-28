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
    @components = _( @components ).map (object, index)=>
      component = if _.isObject( object ) and object.ctype? then Luca.util.LazyObject( object ) else object

      # if we're using base backbone views, then they don't extend themselves
      # with their passed options, so this is a workaround
      if !component.renderTo and component.options.renderTo
        component.container = component.renderTo = component.options.renderTo

      component
  
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
