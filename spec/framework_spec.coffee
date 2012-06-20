#= require "./helper"

describe "The Luca Framework", ->
  it "should specify a version", ->
    expect(Luca.VERSION).toBeDefined()

  it "should define Luca in the global space", ->
    expect(Luca).toBeDefined()

  it "should enable bootstrap by default", ->
    expect(Luca.enableBootstrap).toBeTruthy()

  it "should have classes in the registry", ->
    expect( Luca.registry.classes ).toBeDefined()

  it "should be able to lookup classes in the registry by ctype", ->
    expect( Luca.registry.lookup("form_view") ).toBeTruthy()

  it "should allow me to add view namespaces to the registry", ->
    Luca.registry.addNamespace("Test.namespace")
    expect( Luca.registry.namespaces(false) ).toContain("Test.namespace")

  it "should resolve a value.string to the object", ->
    window.nested =
      value:
        string: "haha"

    value = Luca.util.nestedValue("nested.value.string", window)

    expect(value).toEqual("haha")

  it "should create an instance of a class by ctype", ->
    object =
      ctype: "view"

    component = Luca.util.lazyComponent(object)

    expect( Luca.isBackboneView(component) ).toEqual true

  it "should find a created view in the cache", ->
    template = new Luca.View
      name: 'test_template'

    expect( Luca.isBackboneView( Luca.cache("test_template") ) ).toEqual true

  it "should detect if an object is probably a backbone view", ->
    obj =
      render: sinon.spy()
      el: true

    expect( Luca.isBackboneView(obj) ).toEqual true
    expect( Luca.isBackboneView({}) ).toEqual false

  it "should detect if an object is probably a backbone collection", ->
    obj =
      fetch: sinon.spy()
      reset: sinon.spy()

    expect( Luca.isBackboneCollection(obj) ).toEqual true
    expect( Luca.isBackboneCollection({}) ).toEqual false

  it "should detect if an object is probably a backbone model", ->
    obj =
      set: sinon.spy()
      get: sinon.spy()
      attributes: {}

    expect( Luca.isBackboneModel(obj) ).toEqual true
    expect( Luca.isBackboneModel({}) ).toEqual false

  it "should detect if a prototype is a luca view", ->
    MyView = Luca.View.extend({})
    expect( Luca.isViewPrototype(MyView) ).toEqual true

  it "should detect if a prototype is a backbone view", ->
    MyView = Backbone.View.extend()
    expect( Luca.isViewPrototype(MyView) ).toEqual true

describe "Luca Component Definition", ->
  beforeEach ->
    Luca.define("Luca.random.ComponentDefinition").extends("Luca.View").with
      property: "value"

  it "should create the namespace for us", ->
    expect( Luca.random ).toBeDefined()

  it "should automatically register the namespace in the registry", ->
    expect( Luca.registry.namespaces() ).toContain Luca.random

  it "should automatically register the component in the registry", ->
    expect( Luca.registry.lookup("component_definition") ).toBeDefined()

  it "should reference the name of the extending class", ->
    instance = new Luca.random.ComponentDefinition
    expect( instance.displayName ).toEqual "Luca.random.ComponentDefinition"

  it "should reference the extended class", ->
    instance = new Luca.random.ComponentDefinition
    expect( instance._superClass() ).toEqual Luca.View

  it "should reference the name of the extended class", ->
    instance = new Luca.random.ComponentDefinition
    expect( instance._superClass().displayName ).toEqual 'Luca.View'

  it "should use the backbone.extend functionality properly", ->
    instance = new Luca.random.ComponentDefinition
    expect( instance.property ).toEqual "value"

  it "should alias to _.def", ->
    proxy = _.def('Luca.random.ComponentDefition')
    expect( proxy.with ).toBeDefined()

  it "should allow me to set the namespace before the definition", ->
    Luca.util.namespace("Luca.View")
    expect( Luca.util.namespace() ).toEqual Luca.View
