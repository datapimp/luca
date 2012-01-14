Luca.containers.TabView = Luca.containers.CardView.extend
  events:
    "click .luca-ui-tab-container li" : "select"
  
  hooks:[
    "before:select"
  ]

  componentType: 'tab_view'

  className: 'luca-ui-tab-view-wrapper'

  components: []

  componentClass: 'luca-ui-tab-panel'

  initialize: (@options={})->
    Luca.containers.CardView.prototype.initialize.apply @, arguments
    _.bindAll @, "select"
  
  select: (e)->
    me = my = $( e.currentTarget )
    @activate my.data('target-tab')

  tab_container: ()->
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
    
    @create_tab_selectors()

    Luca.containers.CardView.prototype.beforeLayout.apply @, arguments
  
  tab_selectors: ()-> $( 'li.tab-selector', @tab_container() )

  create_tab_selectors: ()->
    _( @components ).map (component,index)=>
      component.renderTo = "##{ @cid }-tab-panel-container"
      title = component.title || "Tab #{ index + 1 }"
      @tab_container().append "<li class='tab-selector' data-target-tab='#{ index }'>#{ title }</li>"
