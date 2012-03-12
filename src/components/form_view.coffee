Luca.components.FormView = Luca.core.Container.extend 
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
  
  initialize: (@options={})->
    Luca.core.Container::initialize.apply @, arguments
    
    _.bindAll @, "submitHandler", "resetHandler", "renderToolbars" 

    @state ||= new Backbone.Model

    @setupHooks( @hooks )
    
    @legend ||= ""

    @configureToolbars()
    @applyStyles() 

  addBootstrapFormControls: ()->
    @bind "after:render", ()=>
      el = @$('.toolbar-container.bottom')

      el.addClass('form-controls')
      el.html @formControlsTemplate || Luca.templates["components/bootstrap_form_controls"](@)  

  applyStyles: ()->
    @applyBootstrapStyles() if Luca.enableBootstrap

    @$el.addClass( "label-align-#{ @labelAlign }") if @labelAlign
    @$el.addClass( @fieldLayoutClass ) if @fieldLayoutClass    

  applyBootstrapStyles: ()->
    @inlineForm = true if @labelAlign is "left"

    @$el.addClass('well') if @well
    @$el.addClass('form-search') if @searchForm 
    @$el.addClass('form-horizontal') if @horizontalForm          
    @$el.addClass('form-inline') if @inlineForm          

  configureToolbars: ()->
    return @addBootstrapFormControls() if Luca.enableBootstrap and @toolbar is true

    if @toolbar is true 
      @toolbars = [
        ctype: 'form_button_toolbar'
        includeReset: true
        position: 'bottom'
      ]

    if @toolbars and @toolbars.length
      @bind "after:render", _.once @renderToolbars    

  resetHandler: (e)->
    me = my = $( e.currentTarget )
    @trigger "before:reset", @
    @reset()
    @trigger "after:reset", @

  submitHandler: (e)->
    me = my = $( e.currentTarget )
    @trigger "before:submit", @
    @submit()
  
  beforeLayout: ()->
    Luca.core.Container::beforeLayout?.apply @, arguments
    @$el.html Luca.templates["components/form_view"]( @ )    


  prepareComponents: ()->
    container = $('.form-view-body', @el)
    _( @components ).each (component)->
      component.container = container
  
  render: ()->
    $( @container ).append( @$el )

  wrapper: ()->
    @$el.parents('.luca-ui-form-view-wrapper')

  toolbarContainers: (position="bottom")->
    $(".toolbar-container.#{ position }", @wrapper() ).first()

  renderToolbars: ()->
      _( @toolbars ).each (toolbar)=>
        toolbar.container = $("##{ @cid }-#{ toolbar.position }-toolbar-container")
        toolbar = Luca.util.lazyComponent(toolbar)
        toolbar.render()
  
  getField: (name)->
    _( @getFields('name', name) ).first()

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
    if @current_model
      event = "before:load:#{ (if @current_model.isNew() then "new" else "existing")}"
      @trigger event, @, @current_model
    
    _( fields ).each (field) =>
      field_name = field.input_name || field.name
      value = if _.isFunction(@current_model[ field_name ]) then @current_model[field_name].apply(@, form) else @current_model.get( field_name ) 
      field?.setValue( value ) unless field.readOnly is true
    
    @trigger "after:load", @, @current_model

    if @current_model
      @trigger "after:load:#{ (if @current_model.isNew() then "new" else "existing")}", @, @current_model
  
  
  reset: ()-> 
    @loadModel( @current_model )

  clear: ()->
    @current_model = if @defaultModel? then @defaultModel() else undefined

    _( @getFields() ).each (field)=> 
      try
        field.setValue('')
      catch e
        console.log "Error Clearing", @, field

  getValues: (reject_blank=false,skip_buttons=true)->
    _( @getFields() ).inject (memo,field)->
      value = field.getValue() 
      
      skip = false
      skip = true if skip_buttons and field.ctype is "button_field"
      skip = true if reject_blank and _.isBlank(value)
      skip = true if field.input_name is "id" and _.isBlank(value)

      memo[ field.input_name || name ] = value unless skip

      memo
    , {}
  
  submit_success_handler: (model, response, xhr)->
    @trigger "after:submit", @, model, response
    
    if response and response.success
      @trigger "after:submit:success", @, model, response
    else
      @trigger "after:submit:error", @, model, response

  submit_fatal_error_handler: ()->
    @trigger.apply ["after:submit", @].concat(arguments)
    @trigger.apply ["after:submit:fatal_error", @].concat(arguments)

  submit: (save=true, saveOptions={})-> 
    _.bindAll @, "submit_success_handler", "submit_fatal_error_handler"

    saveOptions.success ||= @submit_success_handler
    saveOptions.error ||= @submit_fatal_error_handler
    
    @current_model.set( @getValues() )
    return unless save
    @current_model.save( @current_model.toJSON(), saveOptions )

  currentModel: ()-> 
    @current_model

  setLegend: (@legend)->
    $('fieldset legend', @el).first().html(@legend)

Luca.register 'form_view', 'Luca.components.FormView'
