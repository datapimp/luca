describe "Luca.Collection", ->
  it "should accept my better method signature", ->
    collection = new Luca.Collection(registerAs:"yesyesyall")
    expect( collection.registerAs ).toEqual("yesyesyall")


describe "Registering with the collection manager", ->
  window.mgr = new Luca.CollectionManager() 

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
      manager: "find_mgr_by_string"