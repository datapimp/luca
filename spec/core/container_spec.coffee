describe 'The Luca Container', ->
  beforeEach ->
    c = @container = new Luca.core.Container
      defaults:
        defaultProperty: 'it_works'
      extensions:[
        extension: 1
      ,
        extension: 2
      ,
        extension: 3
      ]
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

    @container.on "before:attach", ()->
      console.log "before attach", @, arguments
    @container.render()

  it "should create getter methods on the for components with roles", ->
    expect( @container.getRoleTwo ).toBeDefined()

  it "should create getter methods on the for components with roles", ->
    expect( @container.getRoleTwo().name ).toEqual 'component_two'

  it "should create a getter function on the container", ->
    expect( @container.getOne().name ).toEqual 'component_one'

  it "should apply extensions to the components", ->
    expect( @container.getRoleOne().extension ).toEqual 1
    expect( @container.getRoleTwo().extension ).toEqual 2

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

describe 'Component Inheritance and Customization', ->
  it "should accept an array for extensions configuration and join on position/index", ->
    container = new Luca.core.Container
      extensions:[
        undefined
      ,
        name: "custom_two"   
      ]
      components:[
        role: "component_one"
        name: "component_one"
      ,
        role: "component_two"
        name: "component_two"
      ]

    container.render()    

    expect( container.getComponentTwo().name ).toEqual "custom_two"

  it "should accept an object for extensions configuration and join using role", ->
    container = new Luca.core.Container
      extensions:
        component_one:
          name: "custom_one"
      components:[
        role: "component_one"
        name: "component_one"
      ,
        role: "component_two"
        name: "component_two"
      ]

    container.render()    

    expect( container.getComponentOne().name ).toEqual "custom_one"

describe 'Component Event Binding', ->
  beforeEach ->
    @container = new Luca.core.Container
      componentEvents:
        "haha trigger:one"                  : "one"
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

      afterRender: ()->
        @getGamma().trigger("after:render:gamma")

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
          components:[
            role: "gamma"
            name: "haha"
          ]
        ]
      ]

    @container.render()

  it "should give me all of the components", ->
    names = _( @container.allChildren() ).pluck('name')
    expect( names ).toEqual ['component_alpha','container_tester','beta_view','haha']

  it "should drill down into nested components", ->
    expect( @container.getBeta ).toBeDefined()
    expect( @container.getBeta().name ).toEqual 'beta_view'

  it "should observe the right rendering order", ->
    expect( @container.getGamma() ).toHaveTriggered("after:render:gamma")

  it "should pick up events on nested components", ->
    @container.getBeta().trigger("trigger:five")
    expect( @container ).toHaveTriggered("five")

  it "should recursively define role based getters", ->
    expect( @container.getAlpha ).toBeDefined()
    expect( @container.getBeta ).toBeDefined()
    expect( @container.getGamma ).toBeDefined()

  it "should define a getter", ->
    expect( @container.getAlphaComponent ).toBeDefined()

  it "should find a nested component by name", ->
    expect( @container.findComponentByName('haha') ).toBeDefined()

  it "should find the component by its name", ->
    expect( @container.findComponentByName("beta_view") ).toBeDefined()

  it "should find the component by its role", ->
    expect( @container.findComponentByRole("alpha") ).toBeDefined()

  it "should find the component by its getter", ->
    expect( @container.findComponentByGetter('getAlphaComponent') ).toBeDefined()

  it "should accept wildcard for component", ->
    @container.getAlphaComponent().trigger "trigger:four"
    expect( @container ).toHaveTriggered("four")

  it "should accept component events with a component name", ->
    @container.getGamma().trigger "trigger:one"
    expect(@container).toHaveTriggered("one")

  it "should accept component events with a component role", ->
    @container.getAlphaComponent().trigger "trigger:two"
    expect(@container).toHaveTriggered("two")

  it "should accept component events with a component getter", ->
    @container.getAlphaComponent().trigger "trigger:three"
    expect(@container).toHaveTriggered("three")


describe 'Parent Container Tracking', ->
  nestedContainer = Luca.register("Luca.components.NestedSpec")
  nestedContainer.extends("Luca.core.Container")
  nestedContainer.defines
    name: "nested_container"
    components:[
      type: "container"
      name: "one",
      role: "one"
      components:[
        type: "container"
        role: "two"
        name: "two"
        components:[
          name: "three"
          role: "three"
        ]
      ]
    ]

  it "should not have a parent unless created by a container", ->
    nestedContainer = (new Luca.components.NestedSpec()).render()
    expect( nestedContainer.getParent ).not.toBeDefined()

  it "should know the root", ->
    nestedContainer = (new Luca.components.NestedSpec()).render()
    one = nestedContainer.getOne()
    expect( one.getRootComponent().name ).toEqual 'nested_container'

  it "should know the root", ->
    nestedContainer = (new Luca.components.NestedSpec()).render()
    two = nestedContainer.getTwo()
    expect( two.getRootComponent().name ).toEqual 'nested_container'

  it "should know its parent", ->
    nestedContainer = (new Luca.components.NestedSpec()).render()
    one = nestedContainer.getOne()
    expect( one.getParent().name ).toEqual 'nested_container' 

  it "should know its parent", ->
    nestedContainer = (new Luca.components.NestedSpec()).render()
    two = nestedContainer.getTwo()
    expect( two.getParent().name ).toEqual 'one' 

  it "should know its parent", ->
    nestedContainer = (new Luca.components.NestedSpec()).render()
    three = nestedContainer.getThree()
    expect( three.getParent().name ).toEqual 'two'    