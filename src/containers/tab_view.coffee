_.def('Luca.containers.TabView').extends('Luca.containers.CardView').with

  hooks:[
    "before:select"
    "after:select"
  ]

  componentType: 'tab_view'

  className: 'luca-ui-tab-view tabbable'

  tab_position: 'top'

  tabVerticalOffset: '50px'

  navClass: "nav-tabs"

  bodyTemplate: "containers/tab_view"
  bodyEl: "div.tab-content"

  initialize: (@options={})->
    @navClass = "nav-list"if @navStyle is "list"

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
      icon = "<i class='icon-#{ component.tabIcon }" if component.tabIcon
      link = "<a href='#'>#{ icon || ''} #{ component.title }</a>"
      selector = tabView.make("li",{class:"tab-selector","data-target":index}, link)
      tabView.tabContainer().append(selector)

      if component.navHeading? and not tabView.navHeadings?[ component.navHeading ]
        $( selector ).before( tabView.make('li',{class:"nav-header"}, component.navHeading))
        tabView.navHeadings ||= {}
        tabView.navHeadings[ component.navHeading ] = true

  highlightSelectedTab: ()->
    @tabSelectors().removeClass('active')
    @activeTabSelector().addClass('active')

  select: (e)->
    e.preventDefault()

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
    @$("ul.#{ @navClass }", @tabContainerWrapper() )

  tabSelectors: ()->
    @$( 'li.tab-selector', @tabContainer() )