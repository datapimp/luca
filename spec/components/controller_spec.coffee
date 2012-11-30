describe 'The Controller Component', ->
  beforeEach ->
    controller = Luca.register  'Luca.components.SpecController'
    controller.extends          'Luca.components.Controller' 
    controller.defines
      name: "spec_controller"
      defaultCard: 'one'
      rootComponent: true
      components:[
        name: "one"
        type: "controller"
        components:[
          name: "alpha"
        ,
          name: "bravo"
        ]
      ,
        name: "two"
        type: "controller"
        components:[
          name: "charlie"
        ,
          name: "delta"
        ]
      ,
        name: "three"
        type: "controller"
        components:[
          name: "echo"
        ]
      ,
        name: "four"
        type: "view"
      ]

    @controller = new Luca.components.SpecController().render()

  it "should track the names of its pages", ->
    names = @controller.sectionNames()
    expect( names... ).toEqual 'one', 'two', 'three', 'four'

  it "should track the names of its controllers", ->
    names = _( @controller.controllers() ).pluck 'name'
    expect( names... ).toEqual 'one', 'two', 'three'

  it "should be stateful", ->
    expect( @controller.state ).toBeDefined()

  it "should track the active page", -> 
    @controller.navigate_to("two")
    expect( @controller.activePage() ).toEqual 'two'

  it "should define a controllerPath method on each page", ->
    expect( @controller.activeComponent().controllerPath ).toBeDefined()

  it "should know the controller path", ->
    path = @controller.activeComponent().controllerPath()
    expect( path... ).toEqual "spec_controller", "one"
