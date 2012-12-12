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

  it "should have access to all of the fields", ->
    @form.render()
    expect( @form.getFields().length ).toEqual 6

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

describe 'Dirty Tracking', ->
  Luca.register("Luca.components.DirtyForm").extends("Luca.components.FormView").defines
    trackDirtyState: true
    components:[
      type: "text"
      name: "dirty_field"
    ]

  beforeEach -> 
    (@dirtyForm = new Luca.components.DirtyForm()).render()


  it "should be stateful", ->
    expect( @dirtyForm.state ).toBeDefined()
    expect( @dirtyForm.state.set('dirty', true) )
    expect( @dirtyForm ).toHaveTriggered("state:change:dirty")

  it "should start off in a clean state", ->
    dirty = @dirtyForm.isDirty()
    expect( dirty ).not.toBeTruthy()

  it "should become dirty if a field changes", ->
    @dirtyForm.getField('dirty_field').trigger("on:change")
    dirty = @dirtyForm.isDirty()
    expect( dirty ).toBeTruthy()

  it "should trigger a state change event", ->
    @dirtyForm.getField('dirty_field').trigger("on:change")
    expect( @dirtyForm ).toHaveTriggered('state:change:dirty')
  
  it "should bubble up field change events", ->  
    @dirtyForm.getField('dirty_field').trigger("on:change")
    expect( @dirtyForm ).toHaveTriggered('field:change')

  it "should become clean on a reset", ->
    @dirtyForm.getField('dirty_field').trigger("on:change")
    @dirtyForm.reset()
    dirty = @dirtyForm.isDirty()
    expect( dirty ).not.toBeTruthy()

describe 'Model Binding', ->
  Luca.register("Luca.FormModel").extends("Luca.Model").defines(defaults:model_field:"value")

  form = Luca.register('Luca.components.ModelBoundForm')

  form.extends("Luca.components.FormView")

  form.defines
    trackModelChanges: true
    components:[
      type: "text"
      name: "model_field"
    ]

  beforeEach ->
    @modelForm = new Luca.components.ModelBoundForm()
    @formModel = new Luca.FormModel()
    @modelForm.render()
    @modelForm.loadModel(@formModel)

  it "should trigger a state change event", ->
    expect( @modelForm ).toHaveTriggered("state:change:currentModel")

  it "should not bind to model changes by default", ->
    expect( Luca.components.FormView::trackModelChanges ).not.toBeTruthy()

  it "should be setup to track model changes", ->
    expect( @modelForm.trackModelChanges ).toBeTruthy()

  it "should change the model's value when the form applies itself", ->
    @modelForm.setValues('model_field':"smooth, baby")
    @modelForm.applyFormValuesToModel()
    expect( @modelForm.getField('model_field').getValue() ).toEqual 'smooth, baby'

  it "should change the field's value when the underlying model changes", ->
    @formModel.set('model_field', 'haha')
    expect( @modelForm.getValues().model_field ).toEqual 'haha'
