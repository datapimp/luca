describe 'The Mixin System', ->
  it "should omit the private methods defined on the mixin", ->
    window.Luca ||= {}

    Luca.mixin.namespace 'Luca.test_modules'

    Luca.test_modules =
      SampleMixin:
        __privateMethod: ()->
          true
        publicMethod: ()-> 
          true

    sampleView = Luca.register('Luca.components.SampleView')

    sampleView.mixesIn 'SampleMixin'

    sampleView.defines
      sampleMethod: ()->
        "sample"

    sampleView = new Luca.components.SampleView

    expect( sampleView.privateMethod ).not.toBeDefined()
    expect( sampleView.publicMethod ).toBeDefined()






