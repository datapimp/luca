#### The Component Container
#
# The Component Container is a nestable component
# which is responsible for laying out the many components
# it contains, assigning them to a DOM container, and
# automatically instantiating and rendering the components
# in their proper place.
_.def('Luca.core.Container').extends('Luca.View').with

  className: 'luca-ui-container'

  componentClass: 'luca-ui-panel'

  isContainer: true

  hooks:[
    "before:components"
    "before:render:components"
    "before:layout"
    "after:components"
    "after:layout"
    "first:activation"
  ]

  rendered: false

  components: []

  initialize: (@options={})->
    _.extend @, @options

    @setupHooks [
      "before:components"
      "before:render:components"
      "before:layout"
      "after:components"
      "after:layout"
      "first:activation"
    ]

    Luca.View::initialize.apply @, arguments

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
  #   beforeRenderComponents()
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
    @applyStyles( @styles ) if @styles?

    if @hasBody or @topToolbar or @bottomToolbar
      @bodyElement ||= "div"
      @bodyClassName ||= "view-body"
      @$append( @make(@bodyElement,class:@bodyClassName) )

      # will only be run if the toolbar module has been mixed in
      @renderToolbars?() if @$bodyEl().length > 0

  doLayout: ()->
    @trigger "before:layout", @
    @componentContainers = @prepareLayout()
    @trigger "after:layout", @

  doComponents: ()->
    @trigger "before:components", @, @components
    @prepareComponents()
    @createComponents()
    @trigger "before:render:components", @, @components
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

  # NOTE:  prepareLayout is expected to return an array of containers
  prepareLayout: ()->
    containers = _( @components ).map (component, index) =>
      @applyPanelConfig.apply @, [ component, index ]

    # TODO. CLEANUP
    # if the container depends on child containers, then they will
    # have top append those for each of the components.  do so here
    if @appendContainers
      _( containers ).each (container)=>
        @$el.append Luca.templates["containers/basic"](container) unless container.appended?
        container.appended = true

    containers

  # prepare components is where each component gets assigned a container to be rendered into
  prepareComponents: ()->
    @components = _( @components ).map (object, index) =>
      object.cty
      panel = @componentContainers[ index ]
      object.container = if @appendContainers then "##{ panel.id }" else @bodyEl()

      object

  createComponents: ()->
    return if @componentsCreated is true

    map = @componentIndex =
      name_index: {}
      cid_index: {}

    @components = _( @components ).map (object, index)=>
      # you can include normal backbone views as components
      # you will want to make sure your render method handles
      # adding the views @$el to the appropriate @container
      component = if _.isObject( object ) and object.render and object.trigger
        object
      else
        object.type ||= object.ctype ||= ( Luca.defaultComponentType )
        Luca.util.lazyComponent( object )

      # if we're using base backbone views, then they don't extend themselves
      # with their passed options, so this is a workaround
      if !component.container and component.options.container
        component.container = component.options.container

      if map and component.cid?
        map.cid_index[ component.cid ] = index

      if map and component.name?
        map.name_index[ component.name ] = index

      component

    @componentsCreated = true
    map

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
        throw e unless Luca.silenceRenderErrors? is true

  topToolbar: undefined

  bottomToolbar: undefined

  # Luca containers can have toolbars, these will get injected before or after the bodyEl
  renderToolbars: ()->
    _( ["top","left","right","bottom"] ).each (orientation)=>
      if @["#{ orientation }Toolbar"]?
        @renderToolbar( orientation, @["#{ orientation }Toolbar"] )

  renderToolbar: (orientation="top", config={})->
    attach = if ( orientation is "top" or orientation is "left" ) then "before" else "after"

    unless @$("#{ orientation }-toolbar-container").length > 0
      @$bodyEl()[ attach ] "<div class='#{ orientation }-toolbar-container' />"

    config.ctype ||= "panel_toolbar"
    config.parent = @
    config.orientation = orientation

    toolbar = @["#{ orientation }Toolbar"] = Luca.util.lazyComponent(config)
    @$(".#{ orientation }-toolbar-container").append( toolbar.render().el )

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
    @createComponents() unless @componentsCreated is true


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