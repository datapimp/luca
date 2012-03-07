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
    expect( Luca.registry.namespaces ).toContain("Test.namespace")

  it "should resolve a value.string to the object", ->
    window.nested =
      value:
        string: "haha"

    value = Luca.util.nestedValue("nested.value.string", window)

    expect(value).toEqual("haha")

  it "should create an instance of a class by ctype", ->
    object = 
      ctype: "template"
      template: "components/form_view"    

    component = Luca.util.lazyComponent(object)
    expect( _.isFunction(component.render) ).toBeTruthy()

describe 
