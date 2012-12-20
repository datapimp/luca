#### Luca.Model
describe "Luca.Model with computed attribute", ->
  App =
    models: {}

  App.models.Sample = Luca.Model.extend
    computed:
      fullName: ['firstName', 'lastName']

    fullName: ()->
      "#{@get("firstName")} #{@get("lastName")}"

  App.models.SampleWithoutCallback = Luca.Model.extend
    computed:
      fullName: ['firstName', 'lastName']

  it "should be undefined if dependences are not set", ->
    model = new App.models.Sample
    expect(model.get("fullName")).toEqual(undefined)

  it "should be undefined if callback function is not present", ->
    model = new App.models.SampleWithoutCallback
    expect(model.get("fullName")).toEqual(undefined)

  it "should not call the callback if dependences are not set", ->
    model = new App.models.Sample
    spy   = sinon.spy(model, "fullName")
    expect( spy.called ).toEqual(false)

  it "should not call it's callback if dependencies stay the same", ->
    model = new App.models.Sample
    model.set({firstName:"Nickolay", lastName: "Schwarz"})
    spy   = sinon.spy(model, "fullName")
    model.set({lastName: "Schwarz"})
    expect( spy.called ).toEqual(false)

  it "should call it's callback when dependencies change", ->
    model = new App.models.Sample
    spy   = sinon.spy(model, "fullName")
    model.set({firstName:"Nickolay"})
    expect( spy.called ).toEqual(true)

  it "should be gettable as a value of the callback", ->
    model = new App.models.Sample
    model.set({firstName:"Nickolay", lastName: "Schwarz"})
    expect(model.get("fullName")).toEqual(model.fullName())

  it "should have it set on constructor if dependencies are supplied", ->
    model = new App.models.Sample({firstName:"Nickolay", lastName: "Schwarz"})
    expect(model.get("fullName")).toEqual('Nickolay Schwarz')



describe 'The Read Method', ->
  ModelClass = Luca.Model.extend
    defaults:
      attribute: "attribute"
    reader: ()-> 
      "reader"
    property: true

  it "should read an attribute", ->
    model = new ModelClass()
    expect( model.read('attribute') ).toEqual "attribute"

  it "should read functions", ->
    model = new ModelClass()
    expect( model.read('attribute') ).toEqual "attribute"
    expect( model.read('reader') ).toEqual 'reader'

  it "should read model object attributes as a fallback", ->
    model = new ModelClass()
    expect( model.read('property') ).toEqual true
