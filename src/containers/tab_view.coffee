Luca.containers.TabView = Luca.containers.CardView.extend
  events:
    "click .luca-ui-tab-container li" : "select"
  
  hooks:[
    "before:select"
    "after:select"
  ]

  componentType: 'tab_view'

  className: 'luca-ui-tab-view-wrapper'

  components: []

  componentClass: 'luca-ui-tab-panel'

  initialize: (@options={})->
    Luca.containers.CardView.prototype.initialize.apply @, arguments
    _.bindAll @, "select", "highlightSelectedTab"
    @setupHooks( @hooks )

    @bind "after:card:switch", @highlightSelectedTab  

  select: (e)->
    me = my = $( e.currentTarget )
    @trigger "before:select", @
    @activate my.data('target-tab')
    @trigger "after:select", @
  
  highlightSelectedTab: ()->
    @tabSelectors().removeClass('active-tab')
    @activeTabSelector().addClass('active-tab')

  activeTabSelector: ()->
    @tabSelectors().eq( @activeCard )

  tabContainer: ()->
    $("##{ @cid }-tab-container>ul")
  
  tab_position: 'top'

  beforeLayout: ()->
    $(@el).addClass("tab-position-#{ @tab_position }")

    if @tab_position is "top" or @tab_position is "left" 
      $(@el).append Luca.templates["containers/tab_selector_container"](@)
      $(@el).append Luca.templates["containers/tab_view"](@)
    else
      $(@el).append Luca.templates["containers/tab_view"](@)
      $(@el).append Luca.templates["containers/tab_selector_container"](@)
    
    @createTabSelectors()

    Luca.containers.CardView.prototype.beforeLayout.apply @, arguments
  
  tabSelectors: ()-> 
    $( 'li.tab-selector', @tabContainer() )

  createTabSelectors: ()->
    _( @components ).map (component,index)=>
      component.container = "##{ @cid }-tab-panel-container"
      title = component.title || "Tab #{ index + 1 }"
      @tabContainer().append "<li class='tab-selector' data-target-tab='#{ index }'>#{ title }</li>"


