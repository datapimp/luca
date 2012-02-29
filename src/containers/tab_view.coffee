Luca.containers.TabView = Luca.containers.CardView.extend
  events:
    "click ul.nav-tabs li" : "select"

  hooks:[
    "before:select"
    "after:select"
  ]

  componentType: 'tab_view'

  className: 'luca-ui-tab-view tabbable'

  tab_position: 'top'

  initialize: (@options={})->
    Luca.containers.CardView.prototype.initialize.apply @, arguments
    _.bindAll @, "select", "highlightSelectedTab"
    @setupHooks( @hooks )

    @bind "after:card:switch", @highlightSelectedTab

  activeTabSelector: ()->
    @tabSelectors().eq( @activeCard )

  prepareLayout: ()->
    @card_containers = _( @cards ).map (card, index)=>
      @$('.tab-content').append Luca.templates["containers/basic"](card) 
      $("##{ card.id }")

  beforeLayout: ()->
    console.log "Before Layout on ", @name
    @$el.addClass("tabs-#{ @tab_position }")

    if @tab_position is "below"
      @$el.append Luca.templates["containers/tab_view"](@)
      @$el.append Luca.templates["containers/tab_selector_container"](@)
    else
      @$el.append Luca.templates["containers/tab_selector_container"](@)
      @$el.append Luca.templates["containers/tab_view"](@)

    Luca.containers.CardView.prototype.beforeLayout.apply @, arguments

  beforeRender: ()->
    Luca.containers.CardView.prototype.beforeRender?.apply @, arguments
    @activeTabSelector().addClass('active')

  highlightSelectedTab: ()->
    @tabSelectors().removeClass('active')
    @activeTabSelector().addClass('active')

  select: (e)->
    me = my = $( e.currentTarget )
    @trigger "before:select", @
    @activate my.data('target')
    @trigger "after:select", @

  tabContainer: ()->
    $("ul.nav-tabs", @el)

  tabSelectors: ()->
    $( 'li.tab-selector', @tabContainer() )
