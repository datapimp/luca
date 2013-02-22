#= require_tree ./examples_browser
#= require_self

page = Docs.register "Docs.views.ExamplesBrowser"
page.extends         "Luca.containers.TabView"

page.contains
  title: "API Browser"
  type: "api_browser"
  name: "api_browser"
,
  title: "Basic FormView"
  type: "basic_form_view"
  name: "basic_form_view"
,
  title: "Complex Layout FormView"
  type: "complex_layout_form"
  name: "complex_layout_form"
,
  title: "Scrollable Table"
  type: "table_view_example"
  name: "table_view_example"
,
  title: "Grid Layout CollectionView"
  type: "grid_layout_view_example"
  name: "grid_layout_view_example"

page.privateConfiguration
  activeCard: 0
  tab_position: "left"
  defaults:
    activation: ()->
      Docs().router.navigate("#examples/#{ @name }/source", false)

page.privateMethods
  # Hack
  afterSelect: _.debounce ()->
    if active = @activeComponent()
      active.findComponentByName?("component")?.runExample?()
  , 10

  wrapExampleComponents: ()->
    wrapped = []

    wrapped = _(@components).map (component,index)->
      title: component.title
      name: component.name
      components:[
        type: "card"
        role: "view_selector"
        afterInitialize: ()->
          @$el.append("<h3>#{ component.title } Example</h3>")
        components:[
          type: component.type
          name: "component"
          activation: ()->
            @runExample?()
        ,
          type: "example_source"
          example: component.name
          name: "source"
        ,
          type: "example_docs"
          example: component.name
          name: "documentation"
        ]        
      ,
        bodyTemplate: "examples_browser/selector"
        bodyTemplateVars: ()->
         example_name: component.name
      ]

    @components = wrapped
    @components.unshift title: "Overview", bodyTemplate: "examples_browser/overview"

  afterInitialize: ()->
    @wrapExampleComponents()

page.publicMethods
  show: (exampleName=0, view="component")->
    @activate exampleName, false, ()->
      @getViewSelector().activate(view)
      @$("li").removeClass("active")
      @$("li.#{view}").addClass("active")

  index: ()->
    @show()

page.register()