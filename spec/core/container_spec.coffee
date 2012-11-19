describe 'The Luca Container', ->
  beforeEach ->
    c = @container = new Luca.core.Container
      defaults:
        defaultProperty: 'it_works'
      components:[
        name: "component_one"
        ctype: "view"
        defaultProperty: "oh_yeah"
        bodyTemplate: ()-> "markup for component one"
        id: "c1"
        value: 1
        getter: "getOne"
        spy: sinon.spy()
        role: "role_one"
      ,
        name: "component_two"
        ctype: "view"
        bodyTemplate: ()-> "markup for component two"
        id: "c2"
        value: 0
        spy: sinon.spy()
        role: "role_two"
      ,
        name: "component_three"
        ctype: "container"
        id: "c3"
        value: 1
        spy: sinon.spy()
        components:[
          ctype: "view"
          name: "component_four"
          bodyTemplate: ()-> "markup for component four"
          spy: sinon.spy()
        ]
      ]

  it "should create getter methods on the for components with roles", ->
    expect( @container.getRoleTwo().name ).toEqual 'component_two'

  it "should create a getter function on the container", ->
    expect( @container.getOne().name ).toEqual 'component_one'

  it "should apply default properties to components", ->
    defaults = @container.selectByAttribute('defaultProperty','it_works')
    custom = @container.selectByAttribute('defaultProperty','oh_yeah')
    expect( defaults.length ).toEqual(2)
    expect( custom.length ).toEqual(1)

  it "should trigger after initialize", ->
    expect( @container ).toHaveTriggered "after:initialize"

  it "should have some components", ->
    expect( @container.components.length ).toEqual 3

  it "should render the container and all of the sub views", ->
    @container.render()
    html=$(@container.el).html()
    expect( html ).toContain "markup for component one"
    expect( html ).toContain "markup for component two"

  it "should render the container and all of the nested sub views", ->
    @container.render()
    html=$(@container.el).html()
    expect( html ).toContain "markup for component four"

  it "should select all components matching a key/value combo", ->
    components = @container.selectByAttribute("value",1)
    expect( components.length ).toEqual 2

  it "should run a function on each component", ->
    @container.eachComponent (c)-> c.spy()

    _( @container.components ).each (component)->
      expect( component.spy ).toHaveBeenCalled()

  it "should run a function on each component including nested", ->
    @container.render()
    @container.eachComponent (c)-> c.spy()
    expect( Luca.cache("component_four").spy ).toHaveBeenCalled()

  it "should be able to find a component by name", ->
    expect( @container.findComponentByName("component_one") ).toBeDefined()
    expect( @container.findComponentByName("undefined") ).not.toBeDefined()