#### Luca.Collection

describe "Luca.Collection", ->
  it "should accept a name and collection manager", ->
    mgr = new Luca.CollectionManager()
    collection = new Luca.Collection([], name:"booya",manager:mgr)
    expect( collection.name ).toEqual("booya")
    expect( collection.manager ).toEqual(mgr)

  it "should allow me to specify my own fetch method on a per collection basis", ->
    spy = sinon.spy()
    collection = new Luca.Collection([],fetch:spy)
    collection.fetch()

    expect( spy.called ).toBeTruthy()

  it "should trigger before:fetch", ->
    collection = new Luca.Collection([], url:"/models")
    spy = sinon.spy()
    collection.bind "before:fetch", spy
    collection.fetch()
    expect( spy.called ).toBeTruthy()

  it "should automatically parse a response with a root in it", ->
    collection = new Luca.Collection([], root:"root",url:"/rooted/models")
    collection.fetch()
    @server.respond()
    expect( collection.length ).toEqual(2)

  it "should attempt to register with a collection manager", ->
    registerSpy = sinon.spy()

    collection = new Luca.Collection [],
      name:"registered"
      register: registerSpy

    expect( registerSpy ).toHaveBeenCalled()

  it "should query collection with filter", ->
    models = []
    models.push id: i, key: 'value' for i in [0..9]
    models[3].key = 'specialValue'

    collection = new Luca.Collection models

    collection.applyFilter key: 'specialValue'

    expect(collection.length).toBe 1
    expect(collection.first().get('key')).toBe 'specialValue'

describe "The ifLoaded helper", ->
  it "should fire the passed callback automatically if there are models", ->
    spy = sinon.spy()
    collection = new Luca.Collection([{attr:"value"}])
    collection.ifLoaded(spy)
    expect( spy.callCount ).toEqual(1)

  it "should fire the passed callback any time the collection resets", ->
    spy = sinon.spy()

    collection = new Luca.Collection([{attr:"value"}], url:"/models")

    collection.ifLoaded ()->
      spy.call()

    collection.fetch()
    @server.respond()

    expect( spy.callCount ).toEqual(2)

  it "should not fire the callback if there are no models", ->
    spy = sinon.spy()
    collection = new Luca.Collection()
    collection.ifLoaded(spy)
    expect( spy.called ).toBeFalsy()

  it "should automatically call fetch on the collection", ->
    spy = sinon.spy()
    collection = new Luca.Collection([],url:"/models",blah:true)
    collection.ifLoaded(spy)
    @server.respond()
    expect( spy.called ).toBeTruthy()

  it "should allow me to not automatically call fetch on the collection", ->
    collection = new Luca.Collection([],url:"/models")
    spy = sinon.spy( collection.fetch )
    fn = ()-> true
    collection.ifLoaded(fn, autoFetch:false)
    expect( spy.called ).toBeFalsy()

describe "The onceLoaded helper", ->
  it "should fire the passed callback once if there are models", ->
    spy = sinon.spy()
    collection = new Luca.Collection([{attr:"value"}])
    collection.onceLoaded(spy)
    expect( spy.callCount ).toEqual(1)

  it "should fire the passed callback only once", ->
    spy = sinon.spy()
    collection = new Luca.Collection([{attr:"value"}],url:"/models")
    collection.onceLoaded(spy)
    expect( spy.callCount ).toEqual(1)

    collection.fetch()
    @server.respond()
    expect( spy.callCount ).toEqual(1)

  it "should not fire the callback if there are no models", ->
    spy = sinon.spy()
    collection = new Luca.Collection()
    collection.onceLoaded(spy)
    expect( spy.called ).toBeFalsy()

  it "should automatically call fetch on the collection", ->
    spy = sinon.spy()
    collection = new Luca.Collection([],url:"/models")
    collection.onceLoaded(spy)
    @server.respond()
    expect( spy.called ).toBeTruthy()

  it "should allow me to not automatically call fetch on the collection", ->
    collection = new Luca.Collection([],url:"/models")
    spy = sinon.spy( collection.fetch )
    fn = ()-> true
    collection.onceLoaded(fn, autoFetch:false)
    expect( spy.called ).toBeFalsy()

describe "Registering with the collection manager", ->

  it "should be able to find a default collection manager", ->
    mgr = new Luca.CollectionManager()
    expect( Luca.CollectionManager.get() ).toEqual(mgr)

  it "should automatically register with the manager if I specify a name", ->
    mgr = new Luca.CollectionManager()
    collection = new Luca.Collection([],name:"auto_register")
    expect( mgr.get("auto_register") ).toEqual(collection)

  it "should register with a specific manager", ->
    window.other_manager = new Luca.CollectionManager()

    collection = new Luca.Collection [],
      name: "other_collection"
      manager: window.other_manager

    expect( window.other_manager.get("other_collection") ).toEqual(collection)

  it "should find a collection manager by string", ->
    window.find_mgr_by_string = new Luca.CollectionManager()

    collection = new Luca.Collection [],
      name: "biggie"
      manager: "find_mgr_by_string"

    expect( collection.manager ).toBeDefined()

  it "should not register with a collection manager if it is marked as private", ->
    manager = new Luca.CollectionManager()

    registerSpy = sinon.spy()

    private = new Luca.Collection [],
      name: "private"
      manager: manager
      private: true
      register: registerSpy

    expect( registerSpy ).not.toHaveBeenCalled()


describe "The Model Bootstrap", ->
  window.ModelBootstrap =
    sample: []

  _(5).times (n)->
    window.ModelBootstrap.sample.push
      id: n
      key: "value"

  it "should add an object into the models cache", ->
    Luca.Collection.bootstrap( window.ModelBootstrap )
    expect( Luca.Collection.cache("sample").length ).toEqual(5)

  it "should fetch the cached models from the bootstrap", ->
    collection = new Luca.Collection [],
      cached: ()-> "sample"

    collection.fetch()

    expect( collection.length ).toEqual(5)
    expect( collection.pluck('id') ).toEqual([0,1,2,3,4])

  it "should reference the cached models", ->
    collection = new Luca.Collection [],
      cached: ()-> "sample"

    expect( collection.cached_models().length ).toEqual(5)

  it "should avoid making an API call", ->
    spy = sinon.spy( Backbone.Collection.prototype.fetch )
    collection = new Luca.Collection [],
        cached: ()-> "sample"

    collection.fetch()
    expect( spy.called ).toBeFalsy()

  it "should make an API call if specifically asked", ->
    spy = sinon.spy()

    collection = new Luca.Collection [],
      cached: ()-> "sample"
      url: ()-> "/models"

    collection.bind "after:response", spy
    collection.fetch(refresh:true)
    @server.respond()

    expect( spy.called ).toBeTruthy()









