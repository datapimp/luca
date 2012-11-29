describe 'The Presenter Mixin', ->
  Luca.register("Luca.models.PresenterModel").extends("Luca.Model").mixesIn("ModelPresenter").defines(version: 1)

  it "should respond to presentAs", ->
    expect( Luca.models.PresenterModel::presentAs ).toBeDefined()
  
