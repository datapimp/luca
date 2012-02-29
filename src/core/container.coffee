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
  
  isContainer: true

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
    @debug "container before render"
    @doLayout() 
    @doComponents()

  doLayout: ()->
    @debug "container do layout"
    @trigger "before:layout", @
    @prepareLayout()    
    @trigger "after:layout", @

  doComponents: ()->
    @debug "container do components"

    @trigger "before:components", @, @components
    @prepareComponents()
    @createComponents()
    @renderComponents()
    @trigger "after:components", @, @components

  applyPanelConfig: (panel, panelIndex)->
    style_declarations = []
    
    style_declarations.push "height: #{ (if _.isNumber(panel.height) then panel.height + 'px' else panel.height ) }" if panel.height
    style_declarations.push "width: #{ (if _.isNumber(panel.width) then panel.width + 'px' else panel.width ) }" if panel.width
    style_declarations.push "float: #{ panel.float }" if panel.float
    
    config = 
      classes: panel?.classes || @componentClass
      id: "#{ @cid }-#{ panelIndex }"
      style: style_declarations.join(';')

  # prepare layout is where you would perform the DOM element
  # creation / manipulation for how your container lays out
  # its components.  Minimally you will want to set the
  # container property on each component.
  prepareLayout: ()->
    @debug "container prepare layout"
    @componentContainers = _( @components ).map (component, index) =>
      @applyPanelConfig.apply @, [ component, index ]
    
    if @appendContainers
      _( @componentContainers ).each (container)=>
        @$el.append Luca.templates["containers/basic"](container) 

  # prepare components is where you would set necessary object
  # attributes on the components themselves.
  prepareComponents: ()-> 
    @debug "container prepare components"
    @components = _( @components ).map (object, index) =>
      panel = @componentContainers[ index ]
      object.container = if @appendContainers then "##{ panel.id }" else @el

      object

  createComponents: ()->
    @debug "container create components"
    map = @componentIndex = 
      name_index: {}
      cid_index: {}

    @components = _( @components ).map (object, index)=>
      component = if _.isObject( object ) and object.ctype? then Luca.util.LazyObject( object ) else object

      # if we're using base backbone views, then they don't extend themselves
      # with their passed options, so this is a workaround
      if !component.container and component.options.container
        component.container = component.options.container
      
      if map and component.cid?
        map.cid_index[ component.cid ] = index
      
      if map and component.name?
        map.name_index[ component.name ] = index

      component
    
    @debug "components created", @components
  # Trigger the Rendering Pipeline process on all of the nested
  # components
  renderComponents: (@debugMode="")->
    @debug "container render components"
    _(@components).each (component)=> 
      component.getParent = ()=> @ 
      $( component.container ).append $(component.el)

      try
        component.render()
      catch e
        console.log "Error Rendering Component #{ component.name || component.cid }", component
        console.log e.message
        console.log e.stack

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
      
      # apply the first:activation trigger on the component, in the context of the component
      # passing as arguments the component itself, and the component doing the activation
      unless component?.previously_activated is true 
        component?.trigger?.apply component, ["first:activation", [component, activator] ]
        component.previously_activated = true

  #### Component Finder Methods
  select: (attribute, value, deep=false)->
    components = _( @components ).map (component)->
      matches = []
      test = component[ attribute ]

      matches.push( component ) if test is value

      if deep is true and component.isContainer is true
        matches.push component.select(attribute, value, true)

      _.compact matches

    _.flatten( components )

  findComponentByName: (name, deep=false)-> 
    @findComponent(name, "name_index", deep)

  findComponentById: (id, deep=false)-> 
    @findComponent(id, "cid_index", deep)

  findComponent: (needle, haystack="name", deep=false)->
    position = @componentIndex?[ haystack ][ needle ]
    component = @components?[ position ]

    return component if component
    
    if deep is true
      sub_container = _( @components ).detect (component)-> component?.findComponent?(needle, haystack, true)
      sub_container?.findComponent?(needle, haystack, true)
  
  # run a function for each component in this container
  # and any nested containers in those components, recursively
  # pass false as the second argument to skip the deep recursion
  eachComponent: (fn, deep=true)->
    _( @components ).each (component)=>
      fn.apply component, [component]
      component?.eachComponent?.apply component, [fn,deep] if deep
  
  indexOf: (name)->
    names = _( @components ).pluck('name')
    _( names ).indexOf(name)
  
  activeComponent: ()->
    return @ unless @activeItem
    return @components[ @activeItem ]

  componentElements: ()-> $(".#{ @componentClass }", @el)
 
  getComponent: (needle)-> 
    @components[ needle ]
  
  rootComponent: ()-> 
    !@getParent?

  getRootComponent: ()-> 
    if @rootComponent() then @ else @getParent().getRootComponent()

Luca.register "container", "Luca.core.Container"
