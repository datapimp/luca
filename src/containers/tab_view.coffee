_.def('Luca.containers.TabView').extends('Luca.containers.CardView').with

  hooks:[
    "before:select"
    "after:select"
  ]

  componentType: 'tab_view'

  className: 'luca-ui-tab-view tabbable'

  tab_position: 'top'

  tabVerticalOffset: '50px'

  bodyTemplate: "containers/tab_view"
  bodyEl: "div.tab-content"

  initialize: (@options={})->
    Luca.containers.CardView::initialize.apply @, arguments

    _.bindAll @, "select", "highlightSelectedTab"

    @setupHooks( @hooks )

    @bind "after:card:switch", @highlightSelectedTab

  activeTabSelector: ()->
    @tabSelectors().eq( @activeCard || @activeTab || @activeItem )

  beforeLayout: ()->
    @$el.addClass("tabs-#{ @tab_position }")
    @activeTabSelector().addClass 'active'

    @createTabSelectors()

    Luca.containers.CardView::beforeLayout?.apply @, arguments

  afterRender: ()->
    Luca.containers.CardView::afterRender?.apply @, arguments
    @registerEvent("click ##{ @cid }-tabs-selector li a", "select")

    if Luca.enableBootstrap and (@tab_position is "left" or @tab_position is "right")
      @tabContainerWrapper().addClass("span2")
      @tabContentWrapper().addClass("span9")


  createTabSelectors: ()->
    tabView = @
    @each (component,index)->
      selector = tabView.make("li",{class:"tab-selector","data-target":index}, "<a>#{ component.title }</a>")
      tabView.tabContainer().append(selector)

  highlightSelectedTab: ()->
    @tabSelectors().removeClass('active')
    @activeTabSelector().addClass('active')

  select: (e)->
    me = my = $( e.target )

    @trigger "before:select", @
    @activate my.parent().data('target')
    @trigger "after:select", @

  componentElements: ()->
    @$(">.tab-content >.#{ @componentClass }")

  tabContentWrapper: ()->
    $("##{ @cid }-tab-view-content")

  tabContainerWrapper: ()->
    $("##{ @cid }-tabs-selector")

  tabContainer: ()->
    @$('ul.nav-tabs', @tabContainerWrapper() )

  tabSelectors: ()->
    @$( 'li.tab-selector', @tabContainer() )