container = Luca.register         "Luca.core.Container"

container.extends                 "Luca.components.Panel"

container.triggers                "before:components",
                                  "before:render:components",
                                  "before:layout",
                                  "after:components",
                                  "after:layout",
                                  "first:activation"

container.defines                                  
  className: 'luca-ui-container'

  componentTag: 'div'

  componentClass: 'luca-ui-panel'

  isContainer: true

  rendered: false

  components: []

  # @componentEvents provides declarative syntax for responding to events on
  # the components in this container.  the format of the syntax is very similar
  # to the other event binding helpers:
  # 
  #   component_accessor component:trigger
  #
  # where component_accessor is either the name of the role, or a method on the container
  # which will find the component in question.
  #
  # myContainer = new Luca.core.Container
  #   componentEvents:
  #     "name component:trigger"    : "handler"
  #     "role component:trigger"    : "handler"
  #     "getter component:trigger"  : "handler"
  #
  componentEvents: {}

  initialize: (@options={})->
    _.extend @, @options

    @setupHooks( Luca.core.Container::hooks )

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

        # if the container defines a @defaults property
        # then we should make sure our child components inherit
        # these values unless specifically defined
        object = _.defaults(object, (container.defaults || {}))

        created = Luca.util.lazyComponent( object )

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

  registerComponentEvents: ()->
    container = @

    for listener, handler of (@componentEvents||{})
      [componentNameOrRole,eventId] = listener.split(' ')

      unless _.isFunction( @[handler] )
        console.log "Error registering component event", listener, componentNameOrRole, eventId
        throw "Invalid component event definition #{ listener }. Specified handler is not a method on the container"

      if componentNameOrRole is "*"
        @eachComponent (component)=> component.on(eventId, @[handler], container)
      else 
        component = @findComponentForEventBinding( componentNameOrRole )

        unless component? and Luca.isComponent(component)
          console.log "Error registering component event", listener, componentNameOrRole, eventId
          throw "Invalid component event definition: #{ componentNameOrRole }"

        component?.bind eventId, @[handler], container

  findComponentForEventBinding: (nameRoleOrGetter)->
    @findComponentByName(nameRoleOrGetter) || @findComponentByGetter( nameRoleOrGetter ) || @findComponentByRole( nameRoleOrGetter )

  findComponentByGetter: (nameRoleOrGetter)->
    if @[ nameRoleOrGetter ]? and _.isFunction( @[ nameRoleOrGetter ] )
      return @[ nameRoleOrGetter ].call(@)

  findComponentByRole: (role)->
    getter = _.str.camelize("get_" + role)
    @[ getter ]?.call(@)

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

createGetterMethods = ()->
  container = @
  @eachComponent (component)->
    if component.getter? and _.isString( component.getter )
      container[ component.getter ] = ()-> component 
  , true

createMethodsToGetComponentsByRole = ()->
  container = @

  @eachComponent (component)->
    if component.role? and _.isString( component.role )
      roleGetter = _.str.camelize( "get_" + component.role ) 

      if container[ roleGetter ]?
        console.log "Attempt to create role based getter #{ roleGetter } for a method which already exists on #{ container.cid }"
      else
        container[ roleGetter ] = ()-> component

  , true

doComponents = ()->
  @trigger "before:components", @, @components
  @prepareComponents()
  @createComponents()
  @trigger "before:render:components", @, @components
  @renderComponents()
  @trigger "after:components", @, @components
  createGetterMethods.call(@)
  createMethodsToGetComponentsByRole.call(@)  
  @registerComponentEvents()

validateContainerConfiguration = ()->
  true