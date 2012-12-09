container = Luca.register         "Luca.Container"

container.extends                 "Luca.Panel"

container.triggers                "before:components",
                                  "before:render:components",
                                  "before:layout",
                                  "after:components",
                                  "after:layout",
                                  "first:activation"

container.replaces                "Luca.core.Container"

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

    # aliases for the components property
    @components ||= @fields ||= @pages ||= @cards ||= @views
    
    # accept components as an array of strings representing
    # the luca component type
    for component in @components when _.isString(component)
      component = (type: component, role: component, name: component)

    _.bindAll(@, "beforeRender")

    @setupHooks( Luca.core.Container::hooks )

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

    componentsWithClassBasedAssignment = @_().select (component)->
      _.isString(component.container) and component.container?.match(/^\./) and container.$( component.container ).length > 0

    # TEMP / HACK / Workaround
    #
    # Containers with components assigned to .class-based-containers
    # seem to get double rendered in the renderComponents() method.
    #
    # So here I am uniquely identifying the containers in a way that is not possible
    # in the templates ( since we want to be able to inherit templates and component assignments )
    if componentsWithClassBasedAssignment.length > 0
      for specialComponent in componentsWithClassBasedAssignment
        containerAssignment = _.uniqueId('container')
        targetEl = container.$( specialComponent.container )
        if targetEl.length > 0
          $(targetEl).attr('data-container-assignment', containerAssignment)
          specialComponent.container += "[data-container-assignment='#{ containerAssignment }']"

  prepareComponents: ()->
    container = @


    _( @components ).each (component, index)=>
      ce = componentContainerElement = @componentContainers?[index]

      # support a variety of the bad naming conventions
      ce.class = ce.class || ce.className || ce.classes

      if @generateComponentElements
        panel = @make(@componentTag, componentContainerElement, '')
        @$append( panel )

      # if the container defines a @defaults property
      # then we should make sure our child components inherit
      # these values unless specifically defined
      if container.defaults?
        component = _.defaults(component, (container.defaults || {}))

      # if the container defines an @extensions property as an array of
      # configuration objects, then we will extend the component config with
      # the object in the matching position of the @extensions array.
      if _.isArray(container.extensions) and _.isObject(container.extensions?[ index ])
        componentExtension = container.extensions[index]
        component = _.extend(component, componentExtension)

      # if the container defines an @extensions property as an object of nested hashes,
      # then extensions is a key/value pair whose key represents the role of the component
      # that we wish to extend / customize 
      if component.role? and _.isObject(container.extensions) and _.isObject(container.extensions[component.role])
        componentExtension = container.extensions[component.role]
        component = _.extend(component, componentExtension)
        
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
      role_index: {}

    container   = @

    @components = _( @components ).map (object, index)=>

      # you can include normal backbone views as components
      # you will want to make sure your render method handles
      # adding the views @$el to the appropriate @container.

      # you can also just pass a string representing the component_type
      component = if Luca.isComponent( object )
        object
      else
        object.type ||= object.ctype

        if !object.type?
          # TODO
          # Add support for all of the various components property aliases
          if object.components?
            object.type = object.ctype = 'container'
          else
            object.type = object.ctype = Luca.defaultComponentType

        object._parentCid ||= container.cid
        created = Luca.util.lazyComponent( object )

      # if we're using base backbone views, then they don't extend themselves
      # with their passed options, so this is a workaround to get them to
      # pick up the container config property
      if !component.container and component.options?.container
        component.container = component.options.container

      component.getParent ||= ()-> Luca( component._parentCid )

      if not component.container?
        console.log component,index,@
        console.error "could not assign container property to component on container #{ @name || @cid }"

      indexComponent( component ).at(index).in( @componentIndex )

      component

    @componentsCreated = true

    map

  # Trigger the Rendering Pipeline process on all of the nested
  # components
  renderComponents: (@debugMode="")->
    @debug "container render components"

    container = @

    _(@components).each (component)->
      try
        component.trigger "before:attach"

        containerElement = container.$(component.container)

        if containerElement.length is 0
          if _.isString( component.container )
            # the container trying to assign this component to is not in the dom
            1

          # try in the window context.  this is almost always certainly a bug
          # so look into wtf is going on and which components are problematic
          containerElement = @$( component.container ).eq(0) if containerElement.length is 0

        containerElement.append( component.el )

        component.trigger "after:attach"
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
  _: ()-> _( @components )

  pluck: (attribute)->
    @_().pluck(attribute)

  invoke: (method)->
    @_().invoke(method)

  select: (fn)->
    @_().select(fn)

  detect: (fn)->
    @_().detect(attribute)

  reject: (fn)->
    @_().reject(fn)

  map: (fn)->
    @_().map(fn)

  registerComponentEvents: (eventList)->
    container = @

    for listener, handler of (eventList || @componentEvents||{})
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


  subContainers: ()->
    @select (component)->
      component.isContainer is true

  roles: ()->
    _( @allChildren() ).pluck('role')

  allChildren: ()->
    children = @components
    grandchildren = _( @subContainers() ).invoke('allChildren')
    _([children,grandchildren]).chain().compact().flatten().value()

  findComponentForEventBinding: (nameRoleOrGetter, deep=true)->
    @findComponentByName(nameRoleOrGetter, deep) || @findComponentByGetter( nameRoleOrGetter, deep ) || @findComponentByRole( nameRoleOrGetter, deep )

  findComponentByGetter: (getter, deep=false)->
    _( @allChildren() ).detect (component)->
      component.getter is getter

  findComponentByRole: (role,deep=false)->
    _( @allChildren() ).detect (component)->
      component.role is role or component.type is role or component.ctype is role

  findComponentByName: (name, deep=false)->
    _( @allChildren() ).detect (component)->
      component.name is name

  findComponentById: (id, deep=false)->
    @findComponent(id, "cid_index", deep)

  findComponent: (needle, haystack="name", deep=false)->
    @createComponents() unless @componentsCreated is true

    position = @componentIndex?[ haystack ][ needle ]
    component = @components[ position ]

    return component if component

    if deep is true
      sub_container = _( @components ).detect (component)->
        component?.findComponent?(needle, haystack, true)

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
    @rootComponent is true || !@getParent?

  getRootComponent: ()->
    if @isRootComponent() then @ else @getParent().getRootComponent()


  selectByAttribute: (attribute, value=undefined, deep=false)->
    components = _( @components ).map (component)->
      matches = []
      test = component[ attribute ]

      matches.push( component ) if test is value or (not value? and test?)

      # recursively traverse our components
      matches.push component.selectByAttribute?(attribute, value, true) if deep is true

      _.compact matches

    _.flatten( components )


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

  childrenWithGetter = _( @allChildren() ).select (component)->
    component.getter?

  _( childrenWithGetter ).each (component)->
    container[ component.getter ] ||= ()->
      component

createMethodsToGetComponentsByRole = ()->
  container = @

  childrenWithRole = _( @allChildren() ).select (component)->
    component.role?

  _( childrenWithRole ).each (component)->
    getter = _.str.camelize( "get_" + component.role )
    container[ getter ] ||= ()->
      component

doComponents = ()->
  @trigger "before:components", @, @components
  @prepareComponents()
  @trigger "before:create:components", @, @components
  @createComponents()
  @trigger "before:render:components", @, @components
  @renderComponents()
  @trigger "after:components", @, @components

  unless @skipGetterMethods is true
    createGetterMethods.call(@)
    createMethodsToGetComponentsByRole.call(@)

  @registerComponentEvents()

validateContainerConfiguration = ()->
  true


# Private Helpers
#
# indexComponent( component ).at( index ).in( componentsInternalIndexMap )
indexComponent = (component)->
  at: (index)->
    in: (map)->
      if component.cid?
        map.cid_index[ component.cid ] = index
      if component.role?
        map.role_index[ component.role ] = index
      if component.name?
        map.name_index[ component.name ] = index
