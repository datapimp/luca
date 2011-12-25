#### Container
Luca.core.Container = Luca.View.extend 
  hooks:[
    "before:components",
    "before:layout",
    "after:components",
    "after:layout"
  ]

  className: 'luca-ui-container'

  rendered: false
  
  # a view will automatically be initialized unless
  # this is set to true
  deferredRender: true
  
  # the luca-ui views are made up of container style views
  # which manage one or more backbone views, and arrange them
  # in familiar patterns according to the layout
  components: []

  # in general any view
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

  # each class which inherits from the base view, should implement its own method
  # for preparing the layout views which underpin it
  prepare_layout: ()-> true
  
  # components need to be assigned to the underlying layout elements, first and foremost
  prepare_components: ()-> true
  
  # create component allows us to do what we can call lazy instantiation.
  # by using a class registry, where we register a ctype with a
  # luca ui view class, we can just pass a hash of options, along with
  # that ctype and have it create that component on demand when we need it.
  # this allows us to nest luca ui components pretty deeply by building
  # complex json structures
  create_components: ()->
    @components = _( @components ).map (object, index)->
      component = if _.isObject( object ) and object.ctype? then Luca.util.LazyObject( object ) else object
  
  # a view in general will have one or more sub-components, which will get rendered after
  # this view handles its layout tasks and creates whatever structural DOM elements are needed
  # to display the views
  render_components: ()->
    _(@components).each (component)=> 
      component.getParent = ()=> @ 
      component.render()
  
  # component_map:
  # cid_index: {}
  # name_index: {}

  # build an index of all of your child components 
  # so that we can look them up by name
  # index_components: ()->
  #   _(@components).each (component, index) =>
  #     name =  component.component_name || component.name 
  #     @component_map.cid_index[ component.cid ] = index
  #     @component_map.name_index[ name ] = index if name

  # the render pipeline first of all creates any structural DOM elements ( the layout elements )
  # and then creates components which are assigned to these elements.  layout views will differ
  # from one another in the way they arrange the sub-components for display in a fixed space
  beforeRender: ()->
    @do_layout() 
    @do_components()
  
  getComponent: (needle)-> 
    #index = if _.isString( needle ) then @component_map.name_index[ needle ] else needle
    @components[ needle ]

  root_component: ()-> 
    !@getParent?

  getRootComponent: ()-> 
    if @root_component() then @ else @getParent().getRootComponent()
