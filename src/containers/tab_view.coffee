Luca.containers.TabView = Luca.containers.CardView.extend
  events:
    "click .luca-ui-tab-container li" : "select"
  
  hooks:[
    "before:select"
  ]

  component_type: 'tab_view'

  className: 'luca-ui-tab-view-wrapper'

  components: []

  component_class: 'luca-ui-tab-panel'

  initialize: (@options={})->
    Luca.containers.CardView.prototype.initialize.apply @, arguments
    _.bindAll @, "select"
  
  select: (e)->
    me = my = $( e.currentTarget )
    @activate my.data('target-tab')

  tab_container: ()->
    $("##{ @cid }-tab-container>ul")

  beforeLayout: ()->
    $(@el).append Luca.templates["containers/tab_view"](@)
    
    @create_tab_selectors()

    Luca.containers.CardView.prototype.beforeLayout.apply @, arguments
  
  create_tab_selectors: ()->
    _( @components ).map (component,index)=>
      component.renderTo = "##{ @cid }-tab-panel-container"
      title = component.title || "Tab #{ index + 1 }"
      @tab_container().append "<li data-target-tab='#{ index }'>#{ title }</li>"
