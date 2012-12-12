describe "The Collection Manager", ->
  App = collections: {}

  App.collections.SampleCollection = Luca.Collection.extend
    url: "/models"

  beforeEach ()->
    Luca.CollectionManager.destroyAll()
    @manager = new Luca.CollectionManager(name:"manager",collectionNamespace: App.collections)

  it "should make the latest instance accessible by class function", ->
    expect( Luca.CollectionManager.get().name ).toEqual("manager")

  it "should create a collection on demand", ->
    collection = @manager.getOrCreate("sample_collection")
    expect( collection.url ).toEqual "/models"

  it "should destroy a collection", ->
    @manager.destroy("sample_collection")
    expect( @manager.get("sample_collection") ).toBeUndefined()

describe "Adding Collections", ->
  manager = Luca.CollectionManager.get?() || new Luca.CollectionManager(name:"blahblah") 
  first   = new Luca.Collection([],name:"added",prop:"val2")
  second  = new Luca.Collection([],name:"added",prop:"val1")

  manager.add("added", first)
  manager.add("added", second)

  expect( manager.get("added") ).toEqual( first )

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

  scope = "one"
  expect( manager.get("baby").pluck('id') ).toEqual([1,2])

describe "Loading collections", ->
  App = collections: {}

  exampleSpy = sinon.spy()
  sampleSpy  = sinon.spy()

  App.collections.ExampleCollection = Luca.Collection.extend
    name: "example"
    url: "/example_models"
    fetch: ()->
      exampleSpy.call()
      @reset([{id: 1}])

  App.collections.SampleCollection = Luca.Collection.extend
    name: "sample"
    url: "/sample_models"
    fetch: ()->
      sampleSpy.call()
      @reset([{id: 4}])

  manager = new Luca.CollectionManager(name:"manager",collectionNamespace: App.collections, initialCollections: ["example", "sample"])

  it "should have example collection created", ->
    collection = manager.get("example")
    expect(collection.url).toEqual ("/example_models")

  it "should have example collection fetched", ->
    expect(exampleSpy).toHaveBeenCalled()

  it "should have sample collection created", ->
    collection = manager.get("sample")
    expect(collection.url).toEqual ("/sample_models")

  it "should have sample collection loaded", ->
    expect(sampleSpy).toHaveBeenCalled()
