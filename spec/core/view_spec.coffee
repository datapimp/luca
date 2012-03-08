describe "Luca.View", ->
  it "should be defined", ->
    expect(Luca.View).toBeDefined()

  it "should extend itself with the passed options", -> 
    view = new Luca.View(name:"custom")
    expect(view.name).toEqual("custom")

  it "should create a unique id based on the name", ->
    view = new Luca.View(name:"boom")
    expect( view.cid ).toContain 'boom'

  it "should register the view in the cache", ->
    view = new Luca.View(name:"cached")
    expect( Luca.cache("cached") ).toBeDefined()

  it "should trigger after initialize", ->
    view = new Luca.View()
    expect( view ).toHaveTriggered("after:initialize")