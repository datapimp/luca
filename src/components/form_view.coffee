Luca.components.FormView = Luca.View.extend
  className: 'luca-ui-form-view'

  hooks:[
    "before:submit",
    "before:clear",
    "before:load",
    "after:submit",
    "after:clear",
    "after:load"
  ]

  container_type: 'column_view'

  initialize: (@options={})->
    _.extend @, @options
    Luca.View.prototype.initialize.apply @, arguments
    @setupHooks( @hooks )
    
    @components ||= @fields

  beforeRender: ()->
    $(@el).append("<form />")

    @form = $('form', @el )
    
    @form.addClass( @form_class ) if @form_class
    
    @check_for_fieldsets()
    
    @fieldsets = @components = _( @components ).map (fieldset, index)=>
      fieldset.renderTo = fieldset.container = @form
      fieldset.id = "#{ @cid }-#{ index }"
      new Luca.containers.FieldsetView(fieldset)

  fieldsets_present : ()-> 
    _( @components ).detect (obj)-> obj.ctype is "fieldset_view"

  check_for_fieldsets: ()->
    unless @fieldsets_present()
      @components = [ 
        ctype: 'fieldset_view'
        components: @components
        container_type: @container_type
      ]

  afterRender: ()->
    _( @components ).each (component)-> 
      component.render()

    $(@container).append $(@el)
  
  getFields: ()->
    _.flatten _.compact _( @fieldsets ).map (fs)-> 
      fs?.getFields?.apply(fs)

  loadModel: (@current_model)->
    form = @
    fields = @getFields()
    
    @trigger "before:load", @, @current_model

    _( fields ).each (field) =>
      field_name = field.input_name || field.name
      value = if _.isFunction(@current_model[ field_name ]) then @current_model[field_name].apply(@, form) else @current_model.get( field_name ) 
      field?.setValue( value )
    
    @trigger "after:load", @, @current_model

  clear: ()->
    @trigger "before:clear", @

    @current_model = undefined
    _( @getFields() ).each (field)-> field.setValue()

    @trigger "after:clear", @

  currentModel: ()-> 
    @current_model

Luca.register 'form_view', 'Luca.components.FormView'
