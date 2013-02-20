# The Luca.Container is the heart and soul of the Luca framework 
# and the component driven design philosophy.  The central idea
# is that every component should be designed as an isolated unit
# which completely encapsulates its features.  It should not know about
# other components outside of it.
# 
# It is the responsibility of a `Luca.Container` to define its 
# child `@components`, render them, and broker communication between them
# in response to events which occur in the user interface.  
#
# A common use case for this would be a page which has a filter form, and
# a grid of search results.  The fields in the filter form are used to 
# filter the table.  Neither the form or the table know about each other, 
# since both can be used in other contexts.  A `Luca.Container` would be used
# to relay events from the form to the table, and in doing so create a higher
# level component which can be extended and re-used. 
#
# #### Using a container to combine a Filter View and Results Table 
#
#         form = Luca.register    "App.views.FilterForm"
#         form.extends            "Luca.components.FormView"
#
#         form.contains
#           type:   "text"
#           label:  "Filter by"
#           name:   "filter_text"
#         ,
#           type:   "button"
#           className: "filter"
#           value:  "Filter"          
#
#
#         form.defines
#           toolbar: false 
# 
# Elsewhere, we have a table that lists records in a collection:
#         
#         table = Luca.register     "App.views.ResultsTable"
#         table.extends             "Luca.components.TableView"
#         table.defines 
#           striped: true
#           collection: "components"
#           columns:[
#             header: "Component Class"
#             reader: "class_name"
#           ,
#             header: "Component Type Alias"
#             reader: "type_alias"
#           ]
#
# We can join these two components together by declaring their relationship
# in a `Luca.Container`.  Remember the components we defined above are just
# prototypes.  We can override specific instance configuration and properties 
# in our container.
#
# #### Container Example
#
#         container = Luca.register     "App.views.ComponentFinder"
#         container.extends             "Luca.Container"
#       
#       # This is the same as defining a components property on the component.
#       # The type alias is derived from the name of the component.  It is 
#       # a short hand way of referencing a component you might reuse a lot.
#       container.contains
#         type: "filter_form"
#         role: "filter"
#       ,
#         type: "results_table"
#         # change the prototype's default 
#         striped: false
#         role: "results"
#         filterable: true
#
#       # A Container will generally define some component event bindings
#       # and handler methods to handle the communication between its sub
#       # components.  By default a container is able to access events
#       # from all of its descendants in the hierarchy. 
#       container.defines
#         # These will be applied to each of our components.
#         defaults:
#           attributes:
#             "data-attribute": "whatever"
#
#         componentEvents:
#           # Any time any of our child components emit
#           # the on:change event, pass it to the filterTable method
#           "* on:change" : "filterTable"
#
#         # Communicates between the filter and the table's
#         # underlying collection.  NOtice the use of the @role
#         # property.  It automatically creates getter helpers for us.
#         filterTable: ()->
#           filter = @getFilter()
#           results = @getResults()
#           # filter.getValues() is a hash of each field and its value
#           results.applyFilter( filter.getValues() )
#         
# ### DOM Layout Configuration
#
# Another responsibility of the container is to structurally layout its
# child components in the DOM.  There are a number of different 
# options available depending on how you need to do this.  By default,
# a `Luca.Container` will simply append the @$el of all of its views
# to its own.
#
# The `Luca.components.Controller` is a container which hides every page
# but the active page.  Similarly, there is the `Luca.containers.TabView`
# which does the same thing, but renders a tab selector menu for you.  You
# can create any type of interface you want using containers. 
#
# To make this easy for you, you can do a few different things:
#
# #### Use the Twitter Bootstrap Fluid Grid
#
#         container = Luca.register "App.views.ColumnLayout" 
#         container.extends         "App.views.ComponentFinder"
#
#         container.contains
#           span: 4
#           type: "filter_form"
#           role: "filter"
#         ,
#           span: 8
#           type: "results_table"
#           role: "results"
#
#         container.defines
#           rowFluid: true
#
# #### Using a layout template with CSS Selectors
#         ... 
#         container.contains
#           role: "filter"
#           container: "#filter-wrapper-dom-selector"
#         ,
#           role: "results"
#           container: "#results-wrapper-dom-selector"
#         ...
#         container.defines
#           # assumes the template will provide the CSS selectors used above 
#           bodyTemplate: "layouts/custom_template"
container = Luca.register         "Luca.Container"

container.extends                 "Luca.Panel"

container.triggers                "before:components",
                                  "before:render:components",
                                  "before:layout",
                                  "after:components",
                                  "after:layout",
                                  "first:activation"

container.replaces                "Luca.Container"

container.publicConfiguration
  # @components should contain a list of object configurations for child view(s)
  # of this container.  minimally, the object configuration should specify 
  # a `@type` property which is a component definition shortcut that will
  # resolve to a registered component definition.  For example, if you have
  # a view class named 'Application.views.CustomView' then your type alias will be
  # 'custom_view'.  The values specified in the configuration object will override the 
  # values defined as properties and methods on your view prototypes.
  #
  # Additionally, there are a few custom attributes which you can specify on your config
  # that will impact the container component itself.  the `@role` property specifies the
  # child view's role in this container, and will define a getter method on the container
  # that allows you to access the child view.  For example:
  #       container = new Luca.Container 
  #         components:[
  #           role: "my_main_dude"
  #           name: "soederpop"
  #         ]
  #
  #       container.getMyMainDude().name #=> "soederpop"
  components:[]

  # The `@defaults` property is an object of configuration parameters which will be set
  # on each child component.  Values explicitly defines in the components config will 
  # take precedence over the default.
  defaults: {}

  # The `@extensions` property is useful when you are subclassing a container view
  # which already defines an array of components, and you want to specifically override
  # properties and settings on the children. The `@extensions` property expects either: 

  # An object whose keys match the names of the `@role` property defined on the child components.
  # The value should be an object which will override any values defined on the parent class.
  #
  # or:
  # 
  # An array of objects in the same array position / index as the target child view you wish to extend.
  extensions: {}

  # @componentEvents provides declarative syntax for responding to events on
  # the components in this container.  the format of the syntax is very similar
  # to the other event binding helpers:
  #
  #       component_accessor component:trigger
  #
  # where component_accessor is either the name of the component, or a the role 
  # property on the component, component:trigger is the event that component fires.
  # handler is a method on the container which will respond to the child component event.
  #
  #       myContainer = new Luca.Container
  #         componentEvents:
  #           "name component:trigger"    : "handler"
  #           "role component:trigger"    : "handler"
  #           "getter component:trigger"  : "handler"
  #         components:[
  #           name: "name"
  #         ]
  #
  componentEvents: {}

container.privateConfiguration
  className: 'luca-ui-container'

  # This is a convenience attribute for identifying
  # views which are luca containers
  isContainer: true

  # if set to true, we will generate DOM elements
  # to wrap each of our components in.  This should 
  # generally be avoided IMO as it pollutes the DOM, 
  # but is currently necessary for some container implementations
  generateComponentElements: false

  # if set to true, the DOM elements which wrap
  # our components will be emptied prior to rendering
  # the component inside this container.
  emptyContainerElements: false

  # if @generateComponentElements is true, which tag should this 
  # container wrap our components in?
  componentTag: 'div'

  # if @generateComponentElements is true, which class should we 
  # apply to the container elements which wrap our components?
  componentClass: 'luca-ui-panel'

  rendered: false



container.privateMethods
  initialize: (@options={})->
    _.extend @, @options

    # aliases for the components property
    @components ||= @fields ||= @pages ||= @cards ||= @views
    
    # accept components as an array of strings representing
    # the luca component type
    for component in @components when _.isString(component)
      component = (type: component, role: component, name: component)

    _.bindAll(@, "beforeRender")

    @setupHooks( Luca.Container::hooks )

    validateContainerConfiguration(@)

    Luca.View::initialize.apply @, arguments

  # Removing a container will call remove on all of the nested components as well.
  remove: ()->
    Luca.View::remove.apply(@, arguments)
    @eachComponent (component)->
      component.remove?()
      
  beforeRender: ()->
    doLayout.call(@)
    doComponents.call(@)
    Luca.Panel::beforeRender?.apply(@, arguments)

  # Components which inherit from Luca.Container can implement
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
        # if a component is tagged with a @component property
        # we assume this is the kind of singleton component
        # and set the type, role and name to the same value (if they're blank)
        if object.component? and not (object.type || object.ctype)
          object.type = object.component
          object.name ||= object.component
          object.role ||= object.component

        object.type ||= object.ctype

        # guess the type based on the properties
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

  # Trigger the Rendering Pipeline process on all of the nested components
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

        if @emptyContainerElements is true
          containerElement.empty()

        containerElement.append( component.el )

        component.trigger "after:attach"
        component.render()
        component.rendered = true
      catch e
        console.log "Error Rendering Component #{ component.name || component.cid }", component

        if _.isObject(e)
          console.log e.message
          console.log e.stack

        throw e unless Luca.silenceRenderErrors? is true

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

  registerComponentEvents: (eventList, direction="on")->
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

        component[direction](eventId, @[handler], container)

container.publicMethods
  # Returns an underscore.js object that wraps the components array
  _: ()-> _( @components )

  # Return the value of attribute of each component 
  pluck: (attribute)->
    @_().pluck(attribute)

  # Invoke the passed method name on each component
  invoke: (method)->
    @_().invoke(method)

  # Select any component for which the passed iterator returns true
  select: (iterator)->
    @_().select(iterator)

  # Find the first matching component for which the passed iterator returns true
  detect: (iterator)->
    @_().detect(iterator)

  # Return a list of components without the components for which the passed iterator returns true 
  reject: (iterator)->
    @_().reject(iterator)

  # Run the passed iterator over each component and return the result in an array
  map: (fn)->
    @_().map(fn)

  # Returns a list of nested components which are also containers
  subContainers: ()->
    @select (component)->
      component.isContainer is true

  roles: ()->
    _( @allChildren() ).chain().pluck('role').compact().value()

  allChildren: ()->
    children = @components

    grandchildren = _( @subContainers() ).map (component)->
      component?.allChildren?()

    _([children,grandchildren]).chain().compact().flatten().value()

  # Find a direct component on this card by its name.
  find: (name)-> 
    _( @components ).detect (c)-> 
      c.name is name    

  findComponentForEventBinding: (nameRoleOrGetter, deep=true)->
    @findComponentByName(nameRoleOrGetter, deep) || @findComponentByGetter( nameRoleOrGetter, deep ) || @findComponentByRole( nameRoleOrGetter, deep )

  findComponentByGetter: (getter, deep=false)->
    _( @allChildren() ).detect (component)->
      component?.getter is getter

  findComponentByRole: (role,deep=false)->
    _( @allChildren() ).detect (component)->
      component?.role is role or component?.type is role or component?.ctype is role

  findComponentByType: (desired,deep=false)->
    _( @allChildren() ).detect (component)->
      desired is (component.type || component.ctype)

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

  indexOfComponentName: (name)->
    names = _( @components ).pluck('name')
    _( names ).indexOf(name)

  indexOf: (nameOrComponent)->
    if _.isString(nameOrComponent)
      return @indexOfComponentName(nameOrComponent)

    if _.isObject(nameOrComponent)
      _( @components ).indexOf( nameOrComponent )

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


container.register()

# This is the method by which a container injects the rendered child views
# into the DOM.  It will get passed the container object, and the component
# that is being rendered.
Luca.Container.componentRenderer = (container, component)->
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
    component?.getter?

  _( childrenWithGetter ).each (component)->
    container[ component.getter ] ||= ()-> component

createMethodsToGetComponentsByRole = ()->
  container = @

  childrenWithRole = _( @allChildren() ).select (component)->
    component?.role?

  _( childrenWithRole ).each (component)->
    getter = _.str.camelize( "get_" + component.role )
    getterFn = ()-> component
    container[ getter ] ||= _.bind(getterFn, container) 

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
