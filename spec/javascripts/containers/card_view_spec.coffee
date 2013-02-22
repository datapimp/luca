describe "The Card View", ->
  beforeEach ->
    @cardView = new Luca.containers.CardView
      visible: true
      activeItem: 0
      afterCardSwitch: sinon.spy()
      beforeCardSwitch: sinon.spy()
      components:[
        markup: "component one"
        name: "one"
        one: true
        firstActivation: sinon.spy()
        activation: sinon.spy()
        deactivation: sinon.spy()
        afterInitialize: ()->
          @on "activation", @oneSpy ||= sinon.spy()
      ,
        markup: "component two"
        name: "two"
        two: true
        firstActivation: sinon.spy()
        activation: sinon.spy()
      ,
        markup: "component three"
        name: "three"
        three: true
      ]

    @cardView.render()

  it "should create three card elements", ->
    expect( @cardView.componentElements().length ).toEqual 3

  it "should hide all but one of the card elements", ->
    display = _( @cardView.$('.luca-ui-card') ).map (el)-> $(el).css('display')
    expect( display ).toEqual(['block','none','none'])

  it "should be able to find the cards by name", ->
    expect( @cardView.find("one") ).toBeDefined()
    expect( @cardView.find("one").one ).toEqual true

  it "should start with the first component active", ->
    expect( @cardView.activeComponent()?.name ).toEqual "one"

  it "should be able to activate components by name", ->
    @cardView.activate("two")
    expect( @cardView.activeComponent()?.name ).toEqual "two"

  it "shouldn't fire first activation on a component that hasn't been activated", ->
    expect( @cardView.find("two")?.firstActivation ).not.toHaveBeenCalled()
    expect( @cardView.find("two") ).not.toHaveTriggered("first:activation")
    expect( @cardView.find("two").previously_activated ).not.toBeTruthy()

  it "should fire firstActivation on a component", ->
    @cardView.activate("two")
    expect( @cardView.find("two") ).toHaveTriggered("first:activation")
    expect( @cardView.find("two")?.firstActivation ).toHaveBeenCalled()
    expect( @cardView.find("two").previously_activated ).toBeTruthy()

  it "should fire deactivation on a component", ->
    @cardView.find("one").spiedEvents = {}
    @cardView.activate("two")
    expect( @cardView.find("one") ).toHaveTriggered("deactivation")

  it "should only fire first activation once", ->
    @cardView.activate("two")
    @cardView.activate("one")
    @cardView.activate("two")
    expect( @cardView.find("two").firstActivation.callCount ).toEqual(1)

  it "should fire the first activation hook on the default card", ->
    expect( @cardView.find("one").firstActivation.callCount ).toEqual(1)

  it "should fire the activation hook on the default card", ->
    expect( @cardView.find("one").activation.callCount ).toEqual(1)

  it "should only fire the activation hook once upon activation", ->
    @cardView.activate("two")
    expect( @cardView.find("two").activation.callCount ).toEqual(1)

  it "should only fire the deactivation hook once upon deactivation", ->
    @cardView.activate("two")
    expect( @cardView.find("one").deactivation.callCount ).toEqual(1)

  it "should fire the beforeCardSwitch hook", ->
    @cardView.activate("two")
    expect( @cardView.beforeCardSwitch ).toHaveBeenCalled()

  it "should fire the afterCardSwitch hook", ->
    @cardView.activate("two")
    expect( @cardView.afterCardSwitch ).toHaveBeenCalled()

  it "should allow me to next through the cards", ->
    @cardView.next()
    expect(@cardView.activeComponent().name ).toEqual("two")

  it "should allow me to previous through the cards", ->
    @cardView.activate("two")
    @cardView.previous()
    expect(@cardView.activeComponent().name).toEqual("one")

  it "should allow me to cycle through the cards", ->
    @cardView.cycle()
    expect(@cardView.activeComponent().name ).toEqual("two")
    @cardView.cycle()
    expect(@cardView.activeComponent().name ).toEqual("three")
    @cardView.cycle()
    expect(@cardView.activeComponent().name ).toEqual("one")
