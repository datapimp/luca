describe 'The Concern System', ->

  window.Luca ||= {}

  Luca.concern.namespace 'Luca.test_concerns'

  Luca.test_concerns =
    CollectionMixin:
      __initializer: ()->
        @trigger "collection:mixin"
    SecondMixin:
      __included: ()->
        window.secondMixinIncluded = true
      __initializer: ()->
        @trigger "second:mixin"
    FirstMixin:
      __initializer: ()->
        @trigger "first:mixin"
      __privateMethod: ()->
        true
      publicMethod: ()-> 
        true

  sampleView = Luca.register('Luca.components.FirstView')

  sampleView.mixesIn 'FirstMixin'

  sampleView.defines
    sampleMethod: ()->
      "sample"

  secondView = Luca.register("Luca.components.SecondView")
  secondView.extends 'Luca.components.FirstView'
  secondView.mixesIn 'SecondMixin'
  secondView.defines
    version: 2

  collection = Luca.register("Luca.components.MixinCollection")
  collection.mixesIn "CollectionMixin"
  collection.defines version: 2

  model = Luca.register("Luca.components.MixinModel")
  model.mixesIn "CollectionMixin"
  model.defines version: 2

  it "should work on models", ->
    model = new Luca.components.MixinModel()
    expect( model ).toHaveTriggered("collection:mixin")

  it "should work on collections", ->
    collection = new Luca.components.MixinCollection()
    expect( collection ).toHaveTriggered("collection:mixin")

  it "should work on views", ->
    secondView = new Luca.components.SecondView
    expect( secondView ).toHaveTriggered("second:mixin")

  it "should omit methods prefixed with the double underscore", ->
    sampleView = new Luca.components.FirstView
    expect( sampleView.__privateMethod ).not.toBeDefined()


  it "should extend the prototype with the concern definition", ->
    sampleView = new Luca.components.FirstView
    expect( sampleView.publicMethod ).toBeDefined()

  it "should call the initializers up the prototype chain", ->
    secondView = new Luca.components.SecondView
    expect( secondView ).toHaveTriggered("first:mixin")
    expect( secondView ).toHaveTriggered("second:mixin")

  describe "Class Methods on the concern", ->
    Luca.test_concerns.ExampleConcern = 
      instanceMethod: ()-> "instanceMethod"
      classMethods:
        classMethod: ()-> "classMethod"

    v = Luca.register("Luca.components.ClassMethodView").mixesIn("ExampleConcern")

    v.defines(version:1)

    it "should distinguish between instance methods and class methods", ->
      value = Luca.components.ClassMethodView::instanceMethod.call(@)
      expect( value ).toEqual 'instanceMethod'

    it "should distinguish between instance methods and class methods", ->
      value = Luca.components.ClassMethodView.classMethod.call(@)
      expect( value ).toEqual 'classMethod'
