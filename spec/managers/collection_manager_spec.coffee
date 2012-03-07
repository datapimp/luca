describe "The Collection Manager", ->

  it "should be defined", ->
    expect( Luca.CollectionManager ).toBeDefined()

  it "should make the latest instance accessible by class function", ->
    manager = new Luca.CollectionManager()
    expect( Luca.CollectionManager.get() ).toEqual( manager )

  it "should be scopable", ->
    scope = "one"

    manager = new Luca.CollectionManager
      getScope: ()-> scope

    babyone = new Luca.Collection(name:"baby")

    manager.add("baby")

    scope = "two"

    babytwo = new Luca.Collection(name:"baby")