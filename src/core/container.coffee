#### The Component Container
#
# The Component Container is a nestable component
# which is responsible for laying out the many components
# it contains, assigning them to a DOM container, and
# automatically instantiating and rendering the components
# in their proper place.  
Luca.core.Container = Luca.View.extend 
  className: 'luca-ui-container'

  componentClass: 'luca-ui-panel'

  hooks:[
    "before:components",
    "before:layout",
    "after:components",
    "after:layout",
    "first:activation"
  ]

  rendered: false

  components: []

  initialize: (@options={})->
    _.extend @, @options
    _.bindAll @, "index_components"

    @setupHooks( Luca.core.Container.prototype.hooks )

    Luca.View.prototype.initialize.apply @, arguments
  
  #### Rendering Pipeline
  #
  # A container has nested components.  these components
  # are automatically rendered inside their own DOM element
  # and then CSS configuration is generally applied to these 
  # DOM elements.  Each component is assigned to this DOM
  # element by specifying a @container property on the component.
  #
  # Each component is instantiated by looking up its @ctype propery
  # in the Luca Component Registry.  Then the components are rendered
  # by having their @render() method called on them.
  #
  # Any class which extends Luca.View will have its defined render method
  # wrapped in a method which triggers "before:render", and "after:render"
  # before and after the defined render method.
  #
  # so you can expect the following, for any container or nested container
  #
  # DOM Element Manipulation:
  #
  # beforeRender()
  # beforeLayout()
  # prepareLayout()
  # afterLayout()
  #
  # Luca / Backbone Component Manipulation
  #
  # beforeComponents()
  # prepareComponents()
  #   createComponents()
  #   renderComponents() ->
  #     calls render() on each component, starting this whole cycle
  #     
  # afterComponents()
  #
  # DOM Injection
  #
  # render()
  # afterRender()
  # 
  # For Components which are originally hidden
  # ( card view, tab view, etc )
  #
  # firstActivation() 
  #
  beforeRender: ()->
    @doLayout() 
    @doComponents()

  doLayout: ()->
    @trigger "before:layout", @
    @prepareLayout()    
    @trigger "after:layout", @

  doComponents: ()->
    @trigger "before:components", @, @components
    @prepareComponents()
    @createComponents()
    @renderComponents()
    @trigger "after:components", @, @components

  applyPanelConfig: (panel, panelIndex)->
    style_declarations = []
    
    style_declarations.push "height: #{ (if _.isNumber(panel.height) then panel.height + 'px' else panel.height ) }" if panel.height
    style_declarations.push "width: #{ (if _.isNumber(panel.width) then panel.width + 'px' else panel.width ) }" if panel.width
    
    config = 
      classes: @componentClass
      id: "#{ @cid }-#{ panelIndex }"
      style: style_declarations.join(';')

  # prepare layout is where you would perform the DOM element
  # creation / manipulation for how your container lays out
  # its components.  Minimally you will want to set the
  # container property on each component.
  prepareLayout: ()->
    @component_containers = _( @components ).map (component, componentIndex) =>
      @applyPanelConfig.apply @, [ component, componentIndex ]

    _( @component_containers ).each (container)=>
      $(@el).append Luca.templates["containers/basic"](container) 

  # prepare components is where you would set necessary object
  # attributes on the components themselves.
  prepareComponents: ()-> 
    @components = _( @components ).map (object, index) =>
      panel = @component_containers[ index ]
      object.container = object.renderTo = "##{ panel.id }"
      object.parentEl = @el

      object

  createComponents: ()->
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
  
  # Trigger the Rendering Pipeline process on all of the nested
  # components
  renderComponents: (@debugMode="")->
    _(@components).each (component)=> 
      component.getParent = ()=> @ 
      $(component.renderTo).append $(component.el)
      component.render()

  #### Container Activation
  # 
  # When a container is first activated is a good time to perform
  # operations which are not needed unless that component becomes
  # visible.  This first activation event should be relayed to all
  # of the nested components.  Components which hide / display
  # other components, such as a CardView or TabContainer
  # will trigger first:activation on the components as they become
  # displayed.
  firstActivation: ()->  
    _( @components ).each (component)=>
      activator = @
      component?.trigger?.apply @, "first:activation", [component, activator] 

  #### Component Finder Methods

  findComponentByName: (name, deep=false)-> @findComponent name, "name_index", deep
  
  findComponentById: (id, deep=false)-> @findComponent id, "cid_index", deep

  findComponent: (needle, haystack="name", deep=false)->
    position = @component_index?[ haystack ][ needle ]
    component = @components?[ position ]

    return component if component
    
    if deep is true
      sub_container = _( @components ).detect (component)-> component?.findComponent?(needle, haystack, true)
      sub_container?.findComponent?(needle, haystack, true)
  
  indexOf: (name)->
    names = _( @components ).pluck('name')
    _( names ).indexOf(name)

  componentElements: ()-> $(".#{ @componentClass }", @el)
 
  getComponent: (needle)-> 
    @components[ needle ]
  
  rootComponent: ()-> 
    !@getParent?

  getRootComponent: ()-> 
    if @rootComponent() then @ else @getParent().getRootComponent()
