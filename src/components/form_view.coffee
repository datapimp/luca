Luca.components.FormView = Luca.View.extend
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
    "click .submit-button" : "submit_handler"
    "click .reset-button" : "reset_handler"

  container_type: 'column_view'

  initialize: (@options={})->
    _.extend @, @options
    Luca.View.prototype.initialize.apply @, arguments
    @setupHooks( @hooks )
    
    @components ||= @fields

    if @toolbar and !@toolbars
      @toolbars = [
        ctype: 'form_button_toolbar'
        position: 'bottom'
        id: "#{ @name }-toolbar-0"
        name: "#{ @name }_toolbar"
        includeReset: true
      ]

    _.bindAll @, "submit_handler", "reset_handler" 

  beforeRender: ()->
    $(@el).append("<form />")

    @form = $('form', @el )
    
    @form.addClass( @form_class ) if @form_class
    
    @check_for_fieldsets()
    
    @fieldsets = @components = _( @components ).map (fieldset, index)=>
      fieldset.renderTo = fieldset.container = fieldset.form = @form
      fieldset.id = "#{ @cid }-#{ index }"
      fieldset.legend = @legend if @legend and index is 0
      new Luca.containers.FieldsetView(fieldset)
     
  afterRender: ()->
    _( @components ).each (component)-> 
      component.render()

    @prepare_toolbars() if @toolbars?.length > 0
  
    $(@container).append $(@el)

    @render_toolbars() if @toolbars?.length > 0

  prepare_toolbars: ()->
    @toolbars = _( @toolbars ).map (toolbar)=>
      toolbar = Luca.util.LazyObject( toolbar )
      $(@el)[ toolbar.position_action() ] Luca.templates["containers/toolbar_wrapper"](id:@name+'-toolbar-wrapper')
      toolbar.container = toolbar.renderTo = $("##{@name}-toolbar-wrapper")
      toolbar

  render_toolbars: ()->
    _(@toolbars).each (toolbar)=>
      toolbar.render()


  fieldsets_present : ()-> 
    _( @components ).detect (obj)-> obj.ctype is "fieldset_view"

  check_for_fieldsets: ()->
    unless @fieldsets_present()
      @components = [ 
        ctype: 'fieldset_view'
        components: @components
        container_type: @container_type
      ]
 
  getFields: (attr,value)->
    fields = _.flatten _.compact _( @fieldsets ).map (fs)-> 
      fs?.getFields?.apply(fs)
    
    # if an optional attribute and value pair is passed
    # then you can limit the array of fields even further
    if fields.length > 0 and attr and value
      fields = fields.select (field)->
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
  
  clear: ()-> @reset()

  reset: ()->
    @current_model = undefined
    _( @getFields() ).each (field)-> field.setValue('')

  getValues: (reject_blank=false,skip_buttons=true)->
    _( @getFields() ).inject (memo,field)->
      value = field.getValue() 
      unless ((skip_buttons and field.ctype is "button_field") or (reject_blank and _.isBlank(value)))
        memo[ field.input_name || name ] = value
      memo
    , {}

  submit: ()->

  reset_handler: (e)->
    me = my = $( e.currentTarget )
    @trigger "before:reset", @
    @reset()
    @trigger "after:reset", @

  submit_handler: (e)->
    me = my = $( e.currentTarget )
    @trigger "before:submit", @
    @submit()
    @trigger "after:submit", @

  currentModel: ()-> @current_model

  setLegend: (@legend)->
    $('fieldset legend', @el).first().html(@legend)

Luca.register 'form_view', 'Luca.components.FormView'
