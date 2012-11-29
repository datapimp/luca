describe 'The Presenter Mixin', ->
  presenterModel = Luca.register("Luca.models.PresenterModel").extends("Luca.Model")
  presenterModel.mixesIn("ModelPresenter")
  presenterModel.defines
    randomProperty: "chocolate" 
    fullName: ()->
      @get("first_name") + ' ' + @get("last_name")
    defaults: 
      first_name: "Jonathan"
      last_name: "Soeder"

  it "should respond to presentAs", ->
    expect( Luca.models.PresenterModel::presentAs ).toBeDefined()

  it "should define the presenter class methods on the model class", ->
    expect( Luca.models.PresenterModel.registerPresenter ).toBeDefined()

  it "should define the presenter class methods on the model class", ->
    expect( Luca.models.PresenterModel.getPresenter ).toBeDefined()

  it "should register a presenter format", ->
    Luca.models.PresenterModel.registerPresenter "names", ["first_name", "last_name", "fullName"]
    expect( Luca.models.PresenterModel.getPresenter("names") ).toBeDefined()

  it "should present a model in the desired format", ->
    model = new Luca.models.PresenterModel()
    presented = model.presentAs('names')
    expect( _.isObject(presented) ).toEqual true
    expect( presented ).toBeDefined()
    expect( _( presented ).keys()... ).toEqual "first_name", "last_name", "fullName"
    expect( presented.fullName ).toEqual 'Jonathan Soeder'
