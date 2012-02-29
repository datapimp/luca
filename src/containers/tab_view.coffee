Luca.containers.TabView = Luca.containers.CardView.extend
  events:
    "click ul.nav-tabs li" : "select"

  hooks:[
    "before:select"
    "after:select"
  ]

  componentType: 'tab_view'

  className: 'tabbable'

  tab_position: 'top'

  initialize: (@options={})->
    Luca.containers.CardView.prototype.initialize.apply @, arguments
    _.bindAll @, "select", "highlightSelectedTab"
    @setupHooks( @hooks )

    @bind "after:card:switch", @highlightSelectedTab

  activeTabSelector: ()->
    @tabSelectors().eq( @activeCard )

  assignTabContainers: ()->
    _( @components ).map (component,index)=>
      component.container = "##{ @cid }-tab-view-content"

  beforeLayout: ()->
    @$el.addClass("tabs-#{ @tab_position }")
    @$el.data('toggle','tab')

    if @tab_position is "below"
      $(@el).append Luca.templates["containers/tab_view"](@)
      $(@el).append Luca.templates["containers/tab_selector_container"](@)
    else
      $(@el).append Luca.templates["containers/tab_selector_container"](@)
      $(@el).append Luca.templates["containers/tab_view"](@)

    @createTabSelectors()

    Luca.containers.CardView.prototype.beforeLayout.apply @, arguments

    @assignTabContainers()

  highlightSelectedTab: ()->
    @tabSelectors().removeClass('active-tab')
    @activeTabSelector().addClass('active-tab')

  select: (e)->
    me = my = $( e.currentTarget )
    @trigger "before:select", @
    @activate my.data('target-tab')
    @trigger "after:select", @

  tabContainer: ()->
    $("ul.nav-tabs", @el)

  tabSelectors: ()->
    $( 'li.tab-selector', @tabContainer() )

  createTabSelectors: ()->
    _( @components ).map (component,index)=>
      title = component.title || "Tab #{ index + 1 }"
      @tabContainer().append "<li class='tab-selector' data-target-tab='#{ index }'>#{ title }</li>"


