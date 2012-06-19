describe 'The Form View', ->
  beforeEach ->
    FormView = Luca.components.FormView.extend
      components:[
        ctype: 'hidden_field'
        name: 'id'
      ,

        ctype: "text_field",
        label: "Field Two"
        name: "field2"
      ,
        ctype: "text_field",
        label: "Field One"
        name: "field1"
      ,
        ctype: "checkbox_field"
        label: "Field Three"
        name: "field3"
      ,
        name: "field4"
        label: "Field Four"
        ctype: "text_area_field"
      ,
        name: "field5"
        ctype: "button_field"
        label: "Click Me"
      ]

    Model = Backbone.Model.extend
      schema:
        field0: "hidden"
        field2: "text"
        field1: "text"
        field3: "boolean"
        field4: "blob"
        field5:
          collection: "sample"

    @form = new FormView()
    @model = new Model(field0:1,field1:"jonathan",field3:true,field4:"what up player?")

  afterEach ->
    @form = undefined
    @model = undefined

  it "should create a form", ->
    expect( @form ).toBeDefined()

  it "should load the model", ->
    @form.loadModel(@model)
    expect( @form.currentModel() ).toEqual @model

  it "should set the field values from the model when loaded", ->
    @form.render()
    @form.loadModel(@model)
    values = @form.getValues()
    expect( values.field1 ).toEqual "jonathan"

  it "should render the components within the body element", ->
    @form.render()
    expect( @form.$bodyEl().is('.form-view-body') ).toEqual true

  it "should assign the components to render inside of the body", ->
    @form.render()
    expect( @form.$bodyEl().html() ).toContain "Field Four"

  it "should allow me to set the values of the form fields with a hash", ->
    @form.render()
    @form.setValues(field1:"yes",field2:"no")
    values = @form.getValues()

    expect( values.field1 ).toEqual "yes"
    expect( values.field2 ).toEqual "no"

  it "should sync the model with the form field values", ->
    @form.render()
    @form.loadModel(@model)
    @form.setValues(field1:"yes")
    expect( @form.getValues().field1 ).toEqual "yes"