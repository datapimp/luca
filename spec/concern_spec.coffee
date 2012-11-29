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

  it "should omit the private methods defined on the mixin", ->
    sampleView = new Luca.components.FirstView
    expect( sampleView.__privateMethod ).not.toBeDefined()

  it "should extend the prototype with the concerns normal methods", ->
    sampleView = new Luca.components.FirstView
    expect( sampleView.publicMethod ).toBeDefined()

  it "should call the initializers up the prototype chain", ->
    secondView = new Luca.components.SecondView
    expect( secondView ).toHaveTriggered("first:mixin")
    expect( secondView ).toHaveTriggered("second:mixin")
