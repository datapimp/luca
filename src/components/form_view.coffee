_.def("Luca.components.FormView").extends('Luca.core.Container').with

  tagName: 'form'

  className: 'luca-ui-form-view'

  hooks:[
    "before:submit"
    "before:reset"
    "before:load"
    "before:load:new"
    "before:load:existing"
    "after:submit"
    "after:reset"
    "after:load"
    "after:load:new"
    "after:load:existing"
    "after:submit:success"
    "after:submit:fatal_error"
    "after:submit:error"
  ]

  events:
    "click .submit-button" : "submitHandler"
    "click .reset-button" : "resetHandler"

  toolbar: true

  legend: ""

  bodyClassName: "form-view-body"
  bodyTemplate: ["components/form_view"]

  initialize: (@options={})->
    @loadMask = Luca.enableBootstrap unless @loadMask?

    Luca.core.Container::initialize.apply @, arguments

    _.bindAll @, "submitHandler", "resetHandler", "renderToolbars", "applyLoadMask"

    @state ||= new Backbone.Model

    @setupHooks( @hooks )

    @applyStyleClasses()

    if @toolbar is true and not (@bottomToolbar? or @topToolbar?)
      @bottomToolbar =
        buttons:[
          icon:"remove-sign"
          label: "Reset"
          eventId: "click:reset"
          className:"reset-button"
          align: 'right'
        ,
          icon:"ok-sign"
          white: true
          label: "Save Changes"
          eventId: "click:submit"
          color: "success"
          className: 'submit-button'
          align: 'right'
        ]

  applyStyleClasses: ()->
    if Luca.enableBootstrap
      @applyBootstrapStyleClasses()

    @$el.addClass( "label-align-#{ @labelAlign }") if @labelAlign
    @$el.addClass( @fieldLayoutClass ) if @fieldLayoutClass

  applyBootstrapStyleClasses: ()->
    @inlineForm = true if @labelAlign is "left"

    @$el.addClass('well') if @well
    @$el.addClass('form-search') if @searchForm
    @$el.addClass('form-horizontal') if @horizontalForm
    @$el.addClass('form-inline') if @inlineForm

  resetHandler: (e)->
    me = my = $( e.currentTarget )
    @trigger "before:reset", @
    @reset()
    @trigger "after:reset", @

  submitHandler: (e)->
    me = my = $( e.currentTarget )
    @trigger "before:submit", @
    @trigger "enable:loadmask", @ if @loadMask is true
    @submit() if @hasModel()

  afterComponents: ()->
    Luca.core.Container::afterComponents?.apply(@, arguments)

    @eachField (field)=>
      field.getForm = ()=> @
      field.getModel = ()=> @currentModel()

  eachField: (iterator)->
    _( @getFields() ).map( iterator )

  getField: (name)->
    _( @getFields('name', name) ).first()

  getFields: (attr,value)->
    # do a deep search of all of the nested components
    # to find the fields
    fields = @select("isField", true, true)

    return fields unless attr and value
    # if an optional attribute and value pair is passed
    # then you can limit the array of fields even further
    _(fields).select (field)->
      property = field[ attr ]
      property? and value is (if _.isFunction(property) then property() else property)

    fields

  loadModel: (@current_model)->
    form = @
    fields = @getFields()

    @trigger "before:load", @, @current_model

    if @current_model
      @current_model.beforeFormLoad?.apply(@current_model, @)

      event = "before:load:#{ (if @current_model.isNew() then "new" else "existing")}"
      @trigger event, @, @current_model

    @setValues(@current_model)

    @trigger "after:load", @, @current_model

    if @current_model
      @trigger "after:load:#{ (if @current_model.isNew() then "new" else "existing")}", @, @current_model

  reset: ()->
    @loadModel( @current_model ) if @current_model?

  clear: ()->
    @current_model = if @defaultModel? then @defaultModel() else undefined

    _( @getFields() ).each (field)=>
      try
        field.setValue('')
      catch e
        console.log "Error Clearing", @, field

  # set the values on the form
  # without syncing
  setValues: (source, options={})->
    source ||= @currentModel()
    fields = @getFields()

    _( fields ).each (field) =>
      field_name = field.input_name || field.name

      if value = source[field_name]
        if _.isFunction(value)
          value = value.apply(@)

      if !value and Luca.isBackboneModel(source)
        value = source.get(field_name)

      field?.setValue( value ) unless field.readOnly is true

    @syncFormWithModel() unless options.silent? is true

  getValues: (options={})->
    options.reject_blank = true unless options.reject_blank?
    options.skip_buttons = true unless options.skip_buttons?

    _( @getFields() ).inject (memo,field)->
      value = field.getValue()
      key = field.input_name || field.name

      skip = false

      # don't include the values of buttons in our values hash
      skip = true if options.skip_buttons and field.ctype is "button_field"

      # if the value is blank and we are passed reject_blank in the options
      # then we should not include this field in our hash.  however, if the
      # field is setup to send blanks, then we will send this value anyway
      if _.string.isBlank( value )
        skip = true if options.reject_blank and !field.send_blanks
        skip = true if field.input_name is "id"

      memo[ key ] = value unless skip is true

      memo
    , {}

  submit_success_handler: (model, response, xhr)->
    @trigger "after:submit", @, model, response
    @trigger "disable:loadmask", @ if @loadMask is true

    if response and response?.success is true
      @trigger "after:submit:success", @, model, response
    else
      @trigger "after:submit:error", @, model, response

  submit_fatal_error_handler: (model, response, xhr)->
    @trigger "after:submit", @, model, response
    @trigger "after:submit:fatal_error", @, model, response

  submit: (save=true, saveOptions={})->
    _.bindAll @, "submit_success_handler", "submit_fatal_error_handler"

    saveOptions.success ||= @submit_success_handler
    saveOptions.error ||= @submit_fatal_error_handler

    @syncFormWithModel()
    return unless save
    @current_model.save( @current_model.toJSON(), saveOptions )

  hasModel: ()->
    @current_model?

  currentModel: (options={})->
    if options is true or options?.refresh is true
      @syncFormWithModel()

    @current_model

  syncFormWithModel: ()->
    @current_model?.set( @getValues() )

  setLegend: (@legend)->
    $('fieldset legend', @el).first().html(@legend)