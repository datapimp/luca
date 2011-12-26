Luca.core.Container = Luca.View.extend 
  hooks:[
    "before:components",
    "before:layout",
    "after:components",
    "after:layout"
  ]

  className: 'luca-ui-container'

  rendered: false
  
  deferredRender: true
  
  components: []

  initialize: (@options={})->
    _.extend @, @options

    @setupHooks( Luca.core.Container.prototype.hooks )

    Luca.View.prototype.initialize.apply @, arguments

    @render() unless @deferredRender
  
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

  prepare_layout: ()-> true
  
  prepare_components: ()-> true
  
  create_components: ()->
    @components = _( @components ).map (object, index)->
      component = if _.isObject( object ) and object.ctype? then Luca.util.LazyObject( object ) else object
  
  render_components: ()->
    _(@components).each (component)=> 
      component.getParent = ()=> @ 
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
