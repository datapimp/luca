describe 'The Checkbox Array Field', ->
  beforeEach ->
    @collection = new Luca.Collection([id:"1",name:"jon"])
    @field = new Luca.fields.CheckboxArray(collection: @collection)

    $('body').append("<div id='jasmine-helper' style='display:none' />")

    $('#jasmine-helper').html( @field.render().el )

  it "should render checkboxes", ->
    expect( @field.checkboxesRendered ).toEqual true

