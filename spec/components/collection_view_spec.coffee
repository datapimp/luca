describe 'The Collection View', ->
  beforeEach ->
    @collection = new Luca.Collection([
      id: 1, attr: "value_one"
    ,
      id: 2, attr: "value_two"
    ],
    model: Luca.Model)

    @view = new Luca.components.CollectionView
      itemProperty: 'attr'
      collection: @collection

    @view.render()

  it "should render the attributes in the specified list elements", ->
    expect( @view.$html() ).toContain('value_one')

