_.def('Luca.core.Container').extends('Luca.components.Panel').with

  className: 'luca-ui-container'

  componentTag: 'div'
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

    # aliases for the components property
    @components ||= @fields ||= @pages ||= @cards ||= @views

    validateContainerConfiguration(@)

    Luca.View::initialize.apply @, arguments

  # Rendering Pipeline
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
    doLayout.call(@)
    doComponents.call(@)
    Luca.components.Panel::beforeRender?.apply(@, arguments)

  # Components which inherit from Luca.core.Container can implement
  # their own versions of this method, if they need to apply any sort
  # of additional styling / configuration for the DOM elements that
  # are created to wrap each container.
  customizeContainerEl: (containerEl, panel, panelIndex)->
    containerEl

  prepareLayout: ()->
    container = @
    @componentContainers = _( @components ).map (component, index)->
      applyDOMConfig.call(container, component, index)

  prepareComponents: ()->
    # accept components as an array of strings representing
    # the luca component type
    for component in @components when _.isString(component)
      component = (type: component)

    _( @components ).each (component, index)=>
      ce = componentContainerElement = @componentContainers?[index]

      # support a variety of the bad naming conventions
      ce.class = ce.class || ce.className || ce.classes

      if @generateComponentElements
        panel = @make(@componentTag, componentContainerElement, '')
        @$append( panel )

      unless component.container?
        component.container = "##{ componentContainerElement.id }" if @generateComponentElements
        component.container ||= @$bodyEl()

  # create components is responsible for turning the JSON syntax of the
  # container's definition into live objects against a given Luca Component
  # type.
  #
  # In addition to this, a container builds an index of the components
  # which belong to it, so that they can easily be looked up by name
  createComponents: ()->
    return if @componentsCreated is true

    map = @componentIndex =
      name_index: {}
      cid_index: {}

    container   = @

    @components = _( @components ).map (object, index)=>

      # you can include normal backbone views as components
      # you will want to make sure your render method handles
      # adding the views @$el to the appropriate @container.

      # you can also just pass a string representing the component_type
      component = if Luca.isBackboneView( object )
        object
      else
        object.type ||= object.ctype

        if !object.type?
          if object.components?
            object.type = object.ctype = 'container'
          else
            object.type = object.ctype = Luca.defaultComponentType

        object = _.defaults(object, (container.defaults || {}))

        created = Luca.util.lazyComponent( object )


      # if you define a @getter property as a string on your component
      # we will create a function with that name on this container that
      # allows you to access this component
      if _.isString( component.getter )
        container[ component.getter ] = (()-> component) 

      # if we're using base backbone views, then they don't extend themselves
      # with their passed options, so this is a workaround to get them to
      # pick up the container config property
      if !component.container and component.options.container
        component.container = component.options.container

      if map and component.cid?
        map.cid_index[ component.cid ] = index

      if map and component.name?
        map.name_index[ component.name ] = index

      component

    @componentsCreated = true

    @registerComponentEvents() unless _.isEmpty(@componentEvents)

    map

  # Trigger the Rendering Pipeline process on all of the nested
  # components
  renderComponents: (@debugMode="")->
    @debug "container render components"

    container = @ 
    _(@components).each (component)->
      component.getParent = ()-> 
        container 

      try
        $( component.container ).append( component.el )
        component.render() 
      catch e
        console.log "Error Rendering Component #{ component.name || component.cid }", component

        if _.isObject(e)
          console.log e.message
          console.log e.stack

        throw e unless Luca.silenceRenderErrors? is true

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
    activator = @
    @each (component, index)->
      # apply the first:activation trigger on the component, in the context of the component
      # passing as arguments the component itself, and the component doing the activation
      unless component?.previously_activated is true
        component?.trigger?.call component, "first:activation", component, activator
        component.previously_activated = true

  #### Underscore Methods For Working with Components
  pluck: (attribute)-> 
    _( @components ).pluck attribute

  invoke: (method)->
    _( @components ).invoke method

  map: (fn)->
    _( @components ).map(fn)
    
  # event binding sugar for nested components
  #
  # you can define events like:

  # _.def("MyContainer").extends("Luca.View").with
  #   componentEvents:
  #     "component_name before:load" : "mySpecialHandler"
  componentEvents: {}

  registerComponentEvents: ()->
    for listener, handler of @componentEvents
      [componentName,trigger] = listener.split(' ')
      component = @findComponentByName(componentName)
      component?.bind trigger, @[handler]

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

  each: (fn)->
    @eachComponent(fn, false)

  # run a function for each component in this container
  # and any nested containers in those components, recursively
  # pass false as the second argument to skip the deep recursion
  eachComponent: (fn, deep=true)->
    _( @components ).each (component, index)=>
      fn.call component, component, index
      component?.eachComponent?.apply component, [fn,deep] if deep

  indexOf: (name)->
    names = _( @components ).pluck('name')
    _( names ).indexOf(name)

  activeComponent: ()->
    return @ unless @activeItem
    return @components[ @activeItem ]

  componentElements: ()->
    @$("[data-luca-parent='#{ @name || @cid }']")

  getComponent: (needle)->
    @components[ needle ]

  isRootComponent:()->
    !@getParent?

  getRootComponent: ()->
    if @isRootComponent() then @ else @getParent().getRootComponent()
    
  selectByAttribute: (attribute, value, deep=false)->
    components = _( @components ).map (component)->
      matches = []
      test = component[ attribute ]

      matches.push( component ) if test is value

      # recursively traverse our components
      matches.push component.selectByAttribute?(attribute, value, true) if deep is true

      _.compact matches

    _.flatten( components )

  select: (attribute, value, deep=false)->
    console.log "Container.select will be replaced by selectByAttribute in 1.0"
    Luca.core.Container::selectByAttribute.apply(@, arguments)

# This is the method by which a container injects the rendered child views
# into the DOM.  It will get passed the container object, and the component
# that is being rendered.  
Luca.core.Container.componentRenderer = (container, component)->
  attachMethod = $( component.container )[ component.attachWith || "append" ]
  attachMethod( component.render().el )


#### Private Helpers

doLayout = ()->
  @trigger "before:layout", @
  @prepareLayout()
  @trigger "after:layout", @

applyDOMConfig = (panel, panelIndex)->
  style_declarations = []

  style_declarations.push "height: #{ (if _.isNumber(panel.height) then panel.height + 'px' else panel.height ) }" if panel.height?
  style_declarations.push "width: #{ (if _.isNumber(panel.width) then panel.width + 'px' else panel.width ) }" if panel.width?
  style_declarations.push "float: #{ panel.float }" if panel.float

  config =
    class: panel?.classes || @componentClass
    id: "#{ @cid }-#{ panelIndex }"
    style: style_declarations.join(';')
    "data-luca-parent" : @name || @cid

  if @customizeContainerEl?
   config = @customizeContainerEl( config, panel, panelIndex )

  config

doComponents = ()->
  @trigger "before:components", @, @components
  @prepareComponents()
  @createComponents()
  @trigger "before:render:components", @, @components
  @renderComponents()
  @trigger "after:components", @, @components

validateContainerConfiguration = ()->
  
