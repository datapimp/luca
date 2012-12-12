describe 'The Table View', ->
  beforeEach ->
    @tableView = new Luca.components.TableView  
      collection: new Luca.Collection
      columns:[
        "column_one"
        "column_two"
      ]

    $('body').append( @tableView.render() )

  it 'should accept strings for column config', ->
    expect( @tableView.columns[0].reader ).toEqual("column_one")

  it 'should automatically determine a missing header config', ->
    expect( @tableView.columns[0].header ).toBeDefined()

