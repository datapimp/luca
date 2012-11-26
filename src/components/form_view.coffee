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

  version: "0.9.33333333"

  initialize: (@options={})->
    @loadMask = Luca.enableBootstrap unless @loadMask?

    Luca.core.Container::initialize.apply @, arguments

    @components ||= @fields

    _.bindAll @, "submitHandler", "resetHandler", "renderToolbars", "applyLoadMask"

    @state ||= new Backbone.Model

    @setupHooks( @hooks )

    @applyStyleClasses()

    if @toolbar isnt false and (not @topToolbar and not @bottomToolbar)
      @topToolbar = @getDefaultToolbar() if @toolbar is "both" or @toolbar is "top"
      @bottomToolbar = @getDefaultToolbar() unless @toolbar is "top"

  getDefaultToolbar: ()->
    Luca.components.FormView.defaultFormViewToolbar

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
    me = my = $( e?.target )
    @trigger "before:reset", @
    @reset()
    @trigger "after:reset", @

  submitHandler: (e)->
    me = my = $( e?.target )
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
    passOne = _( @getFields('name', name) ).first()
    return passOne if passOne?

    _( @getFields('input_name', name) ).first()

  getFields: (attr,value)->
    fields = @selectByAttribute("isField", true, true)

    if attr? and value?
      fields = _(fields).select (field)->
        property  = field[ attr ]
        property  = property.call(field) if _.isFunction(property)
        property is value

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

  # Public: returns a hash of values for the form fields in this view.
  #
  # options - An options Hash to control the behavior of values returned (default: {}):
  #           reject_blank: don't include values which are blank (default: true)
  #           skip_buttons: don't include button fields (default: true)
  #           blanks: an inverse alias for reject_blank (default: false)
  getValues: (options={})->
    options.reject_blank = true unless options.reject_blank?
    options.skip_buttons = true unless options.skip_buttons?
    options.reject_blank = true if options.blanks is false

    values = _( @getFields() ).inject (memo,field)=>
      value   = field.getValue()
      key     = field.input_name || field.name

      valueIsBlank      = !!(_.str.isBlank( value ) || _.isUndefined( value ))

      allowBlankValues  = not options.reject_blank and not field.send_blanks

      if options.debug
        console.log "#{ key } Options", options, "Value", value, "Value Is Blank?", valueIsBlank, "Allow Blanks?", allowBlankValues

      if options.skip_buttons and field.ctype is "button_field"
        skip = true
      else
        if valueIsBlank and allowBlankValues is false
          skip = true

        if field.input_name is "id" and valueIsBlank is true
          skip = true

      if options.debug
        console.log "Skip is true on #{ key }"

      if skip isnt true
        memo[ key ] = value

      memo

    , (options.defaults || {})

    values

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

  flash: (message)->
    if @$('.toolbar-container.top').length > 0
      @$('.toolbar-container.top').after(message)
    else
      @$bodyEl().prepend(message)

  successFlashDelay: 1500

  successMessage: (message)->
    @$('.alert.alert-success').remove()
    @flash Luca.template("components/form_alert", className:"alert alert-success", message: message)
    _.delay ()=>
      @$('.alert.alert-success').fadeOut()
    , @successFlashDelay || 0

  errorMessage: (message)->
    @$('.alert.alert-error').remove()
    @flash Luca.template("components/form_alert", className:"alert alert-error", message: message)


Luca.components.FormView.defaultFormViewToolbar =
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


