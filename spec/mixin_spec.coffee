describe 'The Mixin System', ->

  window.Luca ||= {}

  Luca.mixin.namespace 'Luca.test_modules'

  Luca.test_modules =
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

  it "should omit the private methods defined on the mixin", ->
    sampleView = new Luca.components.FirstView
    expect( sampleView.__privateMethod ).not.toBeDefined()

  it "should extend the prototype with the mixins normal methods", ->
    sampleView = new Luca.components.FirstView
    expect( sampleView.publicMethod ).toBeDefined()

  it "should call the initializer for that module on the instance", ->
    secondView = new Luca.components.SecondView
    expect( secondView ).toHaveTriggered("second:mixin")

  it "should call the initializers up the prototype chain", ->
    secondView = new Luca.components.SecondView
    expect( secondView ).toHaveTriggered("first:mixin")
