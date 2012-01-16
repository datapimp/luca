Luca.components.FormView = Luca.core.Container.extend 
  tagName: 'form'

  className: 'luca-ui-form-view'

  hooks:[
    "before:submit",
    "before:reset",
    "before:load",
    "after:submit",
    "after:reset",
    "after:load"
  ]

  events:
    "click .submit-button" : "submitHandler"
    "click .reset-button" : "resetHandler"

  initialize: (@options={})->
    Luca.core.Container.prototype.initialize.apply @, arguments
    
    @debug "form view initialized"

    @state ||= new Backbone.Model

    @setupHooks( @hooks )

    _.bindAll @, "submitHandler", "resetHandler" 

  resetHandler: (e)->
    me = my = $( e.currentTarget )
    @trigger "before:reset", @
    @reset()
    @trigger "after:reset", @

  submitHandler: (e)->
    me = my = $( e.currentTarget )
    @trigger "before:submit", @
    @submit()
    @trigger "after:submit", @
  
  beforeLayout: ()->
    @debug "form view before layout"
    $(@el).html Luca.templates["components/form_view"]( @ )

  prepareLayout: ()->
    Luca.core.Container.prototype.prepareLayout?.apply @, arguments
    _( @components ).each (component) =>
      component.container = $('.form-view-body',@el)

  render: ()->
    @debug ["form view render", @container, @el]
    $(@container).append $(@el)

  getFields: (attr,value)->
    # do a deep search of all of the nested components
    # to find the fields
    fields = @select("isField", true, true)

    # if an optional attribute and value pair is passed
    # then you can limit the array of fields even further
    if fields.length > 0 and attr and value
      fields = _(fields).select (field)->
        property = field[ attr ]
        return false unless property?
        propvalue = if _.isFunction(property) then property() else property
        value is propvalue

    fields

  loadModel: (@current_model)->
    form = @
    fields = @getFields()
    
    @trigger "before:load", @, @current_model
    
    _( fields ).each (field) =>
      field_name = field.input_name || field.name
      value = if _.isFunction(@current_model[ field_name ]) then @current_model[field_name].apply(@, form) else @current_model.get( field_name ) 
      field?.setValue( value ) unless field.readOnly is true
    
    @trigger "after:load", @, @current_model
  
  reset: ()-> 
    @loadModel( @current_model )

  clear: ()->
    @current_model = undefined
    _( @getFields() ).each (field)-> field.setValue('')

  getValues: (reject_blank=false,skip_buttons=true)->
    _( @getFields() ).inject (memo,field)->
      value = field.getValue() 
      unless ((skip_buttons and field.ctype is "button_field") or (reject_blank and _.isBlank(value)))
        memo[ field.input_name || name ] = value
      memo
    , {}

  submit: ()-> @current_model.set( @getValues() )

  currentModel: ()-> @current_model

  setLegend: (@legend)->
    $('fieldset legend', @el).first().html(@legend)

Luca.register 'form_view', 'Luca.components.FormView'
