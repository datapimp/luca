describe 'The Component Definition System', ->
  beforeEach ->
    unfinished = Luca.register 'Luca.components.UnfinishedDefinition'

    sample = Luca.register  'Luca.components.SampleComponentDefinition'

    sample.classMethods
      classMethod: ()-> "classMethod"

    sample.contains
      name: "component_one"
    ,
      name: "component_two"

    sample.classConfiguration
      classAttribute: "classAttribute"

    sample.afterDefinition( sinon.spy() )

    sample.publicInterface
      publicAttribute: "publicAttribute"
      publicMethod: ()-> "publicMethod"

    sample.privateInterface
      privateAttribute: "privateAttribute"
      privateMethod: ()-> "privateMethod"

    sample.publicConfiguration
      publicProperty: "publicProperty"

    sample.privateConfiguration
      privateProperty: "privateProperty"

    sample.register()

  it "should find a definition ", ->
    definition = Luca.define.findDefinition('Luca.components.UnfinishedDefinition')
    expect( Luca.components.UnfinishedDefinition ).not.toBeDefined()
    expect( definition ).toBeDefined()

  it "should find a component definition through the Luca() helper", ->
    definition = Luca("Luca.components.SampleComponentDefinition")
    expect( definition.extend ).toBeDefined()
    expect( definition.register ).not.toBeDefined()

  it "should find an incomplete definition through the Luca() helper", ->
    definition = Luca("Luca.components.UnfinishedDefinition")
    expect( definition ).toBeDefined()
    expect( definition.register ).toBeDefined()

  # I did this to make the definition not require a single method
  # to be called at the end every time, if it is more readable to leave it off.
  it "should know if a definition is 'open'", ->
    definition = Luca("Luca.components.UnfinishedDefinition")
    expect( definition.isOpen() ).toBeTruthy()

  it "should close any open definitions", ->
    Luca.define.close()
    expect( Luca.components.UnfinishedDefinition ).toBeDefined()  
    expect( Luca.define.incomplete().length ).toEqual 0

  it "should define a component", ->
    expect( Luca.isComponentPrototype(Luca.components.SampleComponentDefinition) ).toEqual true

  it "should add everything defined for the prototype", ->
    for attribute in ["publicMethod","publicProperty","publicAttribute","privateAttribute","privateMethod","privateProperty"]
      expect( Luca.components.SampleComponentDefinition.prototype[attribute] ).toBeDefined()

  it "should default to Luca.View for the extends portion", ->
    expect( Luca.parentClasses(Luca.components.SampleComponentDefinition) ).toContain 'Luca.View'
  
  it "should build a components property", -> 

  it "should define class methods ", ->  
    test = Luca.components.SampleComponentDefinition.classMethod()
    expect( test ).toEqual 'classMethod'

  it "should define class configuration ", ->  
    test = Luca.components.SampleComponentDefinition.classAttribute
    expect( test ).toEqual 'classAttribute'

  describe 'The Component MetaData', ->
    beforeEach ->
      @metaData = Luca.registry.getMetaDataFor('Luca.components.SampleComponentDefinition')

    it "should provide access to component meta data", ->
      meta = Luca.components.SampleComponentDefinition::componentMetaData()
      expect( meta ).toEqual( @metaData )

    it "should know the public interface", ->
      expect( @metaData.publicAttributes() ).toContain('publicProperty','publicMethod','publicAttribute')

    it "should know the public methods", ->
      expect( @metaData.publicMethods() ).toContain('publicMethod')
      expect( @metaData.publicMethods() ).not.toContain('publicAttribute')

    it "should know the private interface", ->
      expect( @metaData.privateAttributes() ).toContain('privateProperty','privateMethod','privateAttribute')

    it "should know the private methods", ->
      expect( @metaData.privateMethods() ).toContain('privateMethod')
      expect( @metaData.privateMethods() ).not.toContain('privateAttribute')

    it "should know the class methods", ->
      expect( @metaData.classMethods() ).toContain("classMethod")

    it "should fire the afterDefinition hook on the component class", ->
      expect( Luca.components.SampleComponentDefinition.afterDefinition ).toHaveBeenCalled() 

    describe 'Component Configuration Validations', ->
      xit "should support specifying which values are required"
      xit "should validate required values are present"
      xit "should validate required values match certain expectations around data type"
