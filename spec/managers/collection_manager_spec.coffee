describe "The Collection Manager", ->
  App = collections: {}

  App.collections.SampleCollection = Luca.Collection.extend()

  manager = new Luca.CollectionManager(collectionNamespace: App.collections)

  it "should be defined", ->
    expect( Luca.CollectionManager ).toBeDefined()

  it "should make the latest instance accessible by class function", ->
    expect( Luca.CollectionManager.get() ).toBeDefined()

  it "should be able to guess a collection constructor class", ->
    base = manager.guessCollectionClass("sample_collection")
    expect( base ).toEqual(App.collections.SampleCollection)


describe "The Scope Functionality", ->
  scope = "one"

  manager = new Luca.CollectionManager
    getScope: ()-> scope

  babyone = new Luca.Collection([{id:1},{id:2}],name:"baby")

  manager.add("baby", babyone)

  expect( manager.get("baby").pluck('id') ).toEqual([1,2])
  expect( manager.get("baby") ).toBeDefined()
  expect( manager.get("baby") ).toEqual( babyone )
  expect( manager.allCollections().length ).toEqual(1) 

  scope = "two"

  babytwo = new Luca.Collection([{id:3},{id:4}],name:"baby")

  expect( manager.get("baby").pluck('id') ).toEqual([3,4])
  expect( manager.get("baby") ).toBeDefined()
  expect( manager.get("baby") ).toEqual( babytwo )
  expect( manager.allCollections().length ).toEqual(1) 


