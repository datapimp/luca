tabView = Luca.register       "Luca.containers.TabView"
tabView.extends               "Luca.containers.CardView"

tabView.triggers              "before:select",
                              "after:select"

tabView.publicConfiguration
  tab_position: 'top'
  tabVerticalOffset: '50px'

tabView.privateConfiguration
  additionalClassNames: 'tabbable'
  navClass: "nav-tabs"
  bodyTemplate: "containers/tab_view"
  bodyClassName: "tab-content"
  skipGetterMethods: true

tabView.defines
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
    tabContainerId = @tabContainer().attr("id")
    @registerEvent("click ##{ tabContainerId } li a", "tabSelectClickHandler")

    if Luca.config.enableBootstrap and (@tab_position is "left" or @tab_position is "right")
      @tabContainerWrapper().addClass("span2")
      @tabContentWrapper().addClass("span9")

  createTabSelectors: ()->
    tabView = @
    @each (component,index)->
      icon = "<i class='icon-#{ component.tabIcon }'></i>" if component.tabIcon
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

  tabSelectClickHandler: (e)->
    e?.preventDefault()
    me = my = $( e.target )
    me = my ||= @tabSelectors()[0]
    tabName = my.parent().data('target')

    @select(tabName)

  select: (tabName=0)->
    @trigger "before:select", @
    @activate(tabName)
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

  bodyTemplateVars: ()->
    cid: @cid  
    navClass: @navClass