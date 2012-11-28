describe 'The Component Definition System', ->
  beforeEach ->
    Luca.components.SampleComponentDefinition = undefined

  it "should define a component", ->
    Luca.register("Luca.components.SampleComponentDefinition").defines(version: 1)
    expect( Luca.isComponentPrototype(Luca.components.SampleComponentDefinition) ).toEqual true

  it "should default to Luca.View for the extends portion", ->
    Luca.register("Luca.components.SampleComponentDefinition").defines(version: 1)
    expect( Luca.parentClasses(Luca.components.SampleComponentDefinition) ).toContain 'Luca.View'


