describe 'The Collection View', ->
  beforeEach ->
    @collection = new Luca.Collection([
      id: 1, attr: "value_one", filter: "value"
    ,
      id: 2, attr: "value_two", filter: "value"
    ],
    model: Luca.Model)

    @view = new Luca.components.CollectionView
      itemTagName: "li"
      itemClassName: "custom-class"
      itemProperty: 'attr'
      collection: @collection
      filterable:
        query:
          filter: "value"
        options:
          sortBy: "filter"

    @view.render()

  it "should provide access to the query", ->
    expect( @view.getQuery() ).toBeDefined()

  it "should provide access to the query options", ->
    expect( @view.getQueryOptions() ).toBeDefined()

  it "should combine filter and pagination in the options hash", ->
    @view.setPage(5)
    @view.applyFilter({filter:"value"},{sortBy:'filter'})

    options = @view.getQueryOptions()
    query = @view.getQuery()

    expect( options.page ).toEqual 5
    expect( options.sortBy ).toEqual 'filter'
    expect( query.filter ).toEqual 'value'

  it "should render the attributes in the specified list elements", ->
    expect( @view.$html() ).toContain('value_one')

  it "should render each of the attributes", ->
    expect( @view.$('li.custom-class').length ).toEqual 2

  it "should locate a dom element by luca model id", ->
    expect( @view.locateItemElement(2).html() ).toContain('value_two')

  it "should refresh the view when a model is added", ->
    @view.collection.add(attr:"value_three",id:3)
    expect( @view ).toHaveTriggered('after:refresh')

  it "should refresh the view when a model is removed", ->
    @view.collection.remove( @view.collection.at(0) )
    expect( @view ).toHaveTriggered('after:refresh')




