describe 'The core Field class', ->
  it "should be set to isField", ->
    field = new Luca.core.Field()
    expect( field.isField ).toEqual true