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
    nested =
      value:
        string: "haha"

    value = Luca.util.nestedValue("value.string", nested)

    expect(value).toEqual("haha")

  it "should resolve a nested.value.string to the object", ->
    window.nested =
      value:
        string: "haha"

    value = Luca.util.nestedValue("nested.value.string")

    expect(value).toEqual("haha")

  it "should know if a component is renderable or not", ->
    renderable = Luca.util.is_renderable({})
    expect(renderable).toBeFalsy()

  it "should know if a component is renderable or not", ->
    view =
      render: ()-> true
    renderable = Luca.util.is_renderable(view)
    expect(renderable).toBeTruthy()

  it "should know if core component is renderable or not", ->
    renderable = Luca.util.is_renderable("form_view")
    expect(renderable).toBeTruthy()
