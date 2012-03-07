#### Luca.Collection

describe "Luca.Collection", ->
  it "should accept my better method signature", ->
    collection = new Luca.Collection(customOption:"yesyesyall")
    expect( collection.customOption ).toEqual("yesyesyall")

  it "should accept a name and collection manager", ->
    mgr = new Luca.CollectionManager()
    collection = new Luca.Collection(name:"booya",manager:mgr)
    expect( collection.name ).toEqual("booya")
    expect( collection.manager ).toEqual(mgr)

describe "Registering with the collection manager", ->
  window.mgr = new Luca.CollectionManager()

  it "should be able to find a default collection manager", ->
    expect( Luca.CollectionManager.get() ).toEqual( window.mgr )

  it "should automatically register with the manager if I specify a name", ->
    collection = new Luca.Collection(name:"auto_register")
    expect( mgr.get("auto_register") ).toEqual(collection)

  it "should register with a specific manager", ->
    window.other_manager = new Luca.CollectionManager()

    collection = new Luca.Collection
      name: "other_collection"
      manager: window.other_manager

    expect( window.other_manager.get("other_collection") ).toEqual(collection)

  it "should find a collection manager by string", ->
    window.find_mgr_by_string = new Luca.CollectionManager()

    collection = new Luca.Collection
      name: "biggie"
      manager: "find_mgr_by_string"

    expect( collection.manager ).toBeDefined()