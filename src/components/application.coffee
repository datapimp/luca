Luca.Application = Luca.containers.Viewport.extend

  components:[
    ctype: 'controller'
    name: 'main_controller'
    defaultCard: 'welcome'
    components:[
      ctype: 'template'
      name: 'welcome'
      template: 'sample/welcome'
      templateContainer: "Luca.templates"
    ]
  ]

  initialize: (@options={})->
    Luca.containers.Viewport::initialize.apply @, arguments

    @collectionManager ||= Luca.CollectionManager.get?() || new Luca.CollectionManager()

    @state = new Backbone.Model( @defaultState )

    @bind "ready", ()=> @render()

  activeView: ()->
    if active = @activeSubSection()
      @view( active )
    else
      @view( @activeSection() )

  activeSubSection: ()->
    @get("active_sub_section")

  activeSection: ()->
    @get("active_section")

  afterComponents: ()->
    Luca.containers.Viewport::afterComponents?.apply @, arguments

    # any time the main controller card switches we should track
    # the active card on the global state chart
    @getMainController()?.bind "after:card:switch", (previous,current)=>
      @state.set(active_section:current.name)

    # any time the card switches on one of the sub controllers
    # then we should track the active sub section on the global state chart
    @getMainController()?.each (component)=>
      if component.ctype.match(/controller$/)
        component.bind "after:card:switch", (previous,current)=>
          @state.set(active_sub_section:current.name)

  beforeRender: ()->
    Luca.containers.Viewport::beforeRender?.apply @, arguments
    #Backbone.history.start()

  # boot should trigger the ready event, which will call the initial call
  # to render() your application, which will have a cascading effect on every
  # subcomponent in the view, recursively rendering everything which is set
  # to automatically render (i.e. any non-deferrable components ).
  #
  # you should use boot to fire up any dependent collections, manager, any
  # sort of data processing, whatever your application requires to run outside
  # of the views
  boot: ()->
    @trigger "ready"

  # delegate to the collection manager's get or create function.
  # use App.collection() to create or access existing collections
  collection: ()->
    @collectionManager.getOrCreate.apply(@collectionManager, arguments)

  get: (attribute)->
    @state.get(attribute)

  getMainController: ()->
    @view("main_controler")

  set: (attributes)->
    @state.set(attributes)

  view: (name)-> Luca.cache(name)

