describe 'The Luca Container', ->
  beforeEach ->
    @container = new Luca.core.Container
      components:[
        name: "component_one"
        ctype: "view"
        bodyTemplate: ()-> "markup for component one"
        id: "c1"
        value: 1
        spy: sinon.spy()
      ,
        name: "component_two"
        ctype: "view"
        bodyTemplate: ()-> "markup for component two"
        id: "c2"
        value: 0
        spy: sinon.spy()
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
    components = @container.select("value",1)
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