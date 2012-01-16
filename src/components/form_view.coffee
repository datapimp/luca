Luca.components.FormView = Luca.core.Container.extend 
  tagName: 'form'

  className: 'luca-ui-form-view'

  hooks:[
    "before:submit"
    "before:reset"
    "before:load"
    "after:submit"
    "after:reset"
    "after:load"
    "after:submit:success"
    "after:submit:error"
  ]

  events:
    "click .submit-button" : "submitHandler"
    "click .reset-button" : "resetHandler"
  
  labelAlign: 'top'

  initialize: (@options={})->
    Luca.core.Container.prototype.initialize.apply @, arguments
    
    @debug "form view initialized"

    @state ||= new Backbone.Model

    @setupHooks( @hooks )
    
    @legend ||= ""

    if @toolbar is true 
      @toolbars = [
        ctype: 'form_button_toolbar'
        includeReset: true
        position: 'bottom'
      ]

      @bind "after:render", _.once @renderToolbars

    _.bindAll @, "submitHandler", "resetHandler", "renderToolbars" 

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
    Luca.core.Container.prototype.beforeLayout?.apply @, arguments
    $(@el).html Luca.templates["components/form_view"]( @ )    
    $(@el).addClass( @fieldLayoutClass ) if @fieldLayoutClass
    $(@el).addClass( "label-align-#{ @labelAlign }")

  prepareComponents: ()->
    container = $('.form-view-body', @el)
    _( @components ).each (component)->
      component.container = container
  
  render: ()->
    $( @container ).append( $(@el) )

  __render: ()->
    @debug "Rendering Form View #{ @name }"
    wrapper = $(Luca.templates["components/form_view"]( @ ))
    
    $('.form-view-body', wrapper).append( $(@el).html() )
    
    @debug ["Appending ", wrapper, $( @container )]

    $(@container).append( wrapper )

  wrapper: ()->
    $(@el).parents('.luca-ui-form-view-wrapper')

  toolbarContainers: (position="bottom")->
    $(".toolbar-container.#{ position }", @wrapper() ).first()

  renderToolbars: ()->
    _( @toolbars ).each (toolbar)=>
      toolbar.container = $("##{ @cid }-#{ toolbar.position }-toolbar-container")
      toolbar = Luca.util.LazyObject(toolbar)
      toolbar.render()

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
    _( @getFields() ).each (field)=> 
      try
        field.setValue('')
      catch e
        console.log "Error Clearing", @, field

  getValues: (reject_blank=false,skip_buttons=true)->
    _( @getFields() ).inject (memo,field)->
      value = field.getValue() 
      unless ((skip_buttons and field.ctype is "button_field") or (reject_blank and _.isBlank(value)))
        memo[ field.input_name || name ] = value
      memo
    , {}
  
  defaultSaveOptions:
    success: (model, response, xhr)->
      @trigger "after:submit:success", model, response
    error: ()->
      console.log "Save Error", arguments
      @trigger "after:submit:error", model, response

  submit: (save=true, saveOptions)-> 
    saveOptions ||= @defaultSaveOptions
    
    _.bind saveOptions.success, @
    _.bind saveOptions.error, @

    @current_model.set( @getValues() )
    return unless save
    @current_model.save( @current_model.toJSON(), saveOptions )

  currentModel: ()-> 
    @current_model

  setLegend: (@legend)->
    $('fieldset legend', @el).first().html(@legend)

Luca.register 'form_view', 'Luca.components.FormView'
