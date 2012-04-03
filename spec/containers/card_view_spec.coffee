describe "The Card View", ->
  beforeEach ->
    @cardView = new Luca.containers.CardView
      activeItem: 0
      components:[
        markup: "component one"
        name: "one"
        one: true
      ,
        markup: "component two"
        name: "two"
        two: true
        firstActivation: sinon.spy()
      ,
        markup: "component three"
        name: "three"
        three: true
      ]

    @cardView.render()

  it "should be able to find the cards by name", ->
    expect( @cardView.find("one") ).toBeDefined()
    expect( @cardView.find("one").one ).toEqual true

  it "should start with the first component active", ->
    expect( @cardView.activeComponent()?.name ).toEqual "one"

  it "should be able to activate components by name", ->
    @cardView.activate("two")
    expect( @cardView.activeComponent()?.name ).toEqual "two"

  it "shouldn't fire first activation on a component", ->
    expect( @cardView.find("two")?.firstActivation ).not.toHaveBeenCalled()

  it "should fire firstActivation on a component", ->
    @cardView.activate("two")
    expect( @cardView.find("two")?.firstActivation ).toHaveBeenCalled()

  it "should fire deactivation on a component", ->
    @cardView.find("one").spiedEvents = {}
    @cardView.activate("two")
    expect( @cardView.find("one") ).toHaveTriggered("deactivation")