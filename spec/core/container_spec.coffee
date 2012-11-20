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
        getter: "getComponentTwo"
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

    @container.render()

  it "should create getter methods on the for components with roles", ->
    expect( @container.getRoleTwo ).toBeDefined()

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


describe 'Component Event Binding', ->
  beforeEach ->
    @container = new Luca.core.Container
      componentEvents:
        "component_alpha trigger:one"       : "one"
        "alpha trigger:two"                 : "two"
        "getAlphaComponent trigger:three"   : "three"
        "* trigger:four"                    : "four"
        "beta trigger:five"                 : "five"

      one: ()->
        @trigger "one" 

      two: ()->
        @trigger "two" 

      three: ()->
        @trigger "three" 

      four: ()->
        @trigger "four"  

      five: ()->
        @trigger "five"  

      registerComponentEvents: ()->
        Luca.core.Container::registerComponentEvents.apply(@, arguments)

      components:[
        name: "component_alpha"
        role: "alpha"
        getter: "getAlphaComponent"
      ,
        name: "container_tester"
        type: "container"
        components:[
          name: "beta_view"
          role: "beta"
        ]
      ]

    @container.render()

  it "should give me all of the components", ->
    names = _( @container.allChildren() ).pluck('name')
    expect( names ).toEqual ['component_alpha','container_tester','beta_view']

  it "should drill down into nested components", ->
    expect( @container.getBeta ).toBeDefined()
    expect( @container.getBeta().name ).toEqual 'beta_view'

  it "should pick up events on nested components", ->
    @container.getBeta().trigger("trigger:five")
    expect( @container ).toHaveTriggered("five")

  it "should define a role based getter", ->
    expect( @container.getAlpha ).toBeDefined()

  it "should define a getter", ->
    expect( @container.getAlphaComponent ).toBeDefined()

  it "should find the component by its role", ->
    expect( @container.findComponentByRole("alpha") ).toBeDefined()

  it "should find the component by its name", ->
    expect( @container.findComponentByName('component_alpha') ).toBeDefined()

  it "should find the component by its getter", ->
    expect( @container.findComponentByGetter('getAlphaComponent') ).toBeDefined()

  it "should accept wildcard for component", ->
    @container.getAlphaComponent().trigger "trigger:four"
    expect( @container ).toHaveTriggered("four")

  it "should accept component events with a component name", ->
    @container.getAlphaComponent().trigger "trigger:one"
    expect(@container).toHaveTriggered("one")

  it "should accept component events with a component role", ->
    @container.getAlphaComponent().trigger "trigger:two"
    expect(@container).toHaveTriggered("two")

  it "should accept component events with a component getter", ->
    @container.getAlphaComponent().trigger "trigger:three"
    expect(@container).toHaveTriggered("three")
