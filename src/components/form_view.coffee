Luca.components.FormView = Luca.View.extend
  className: 'luca-ui-form-view'

  hooks:[
    "before:submit"
  ]

  container: 'split_view'

  initialize: (@options={})->
    _.extend @, @options
    Luca.View.prototype.initialize.apply @, arguments
    @setupHooks( @hooks )
    
    @components ||= @fields

  beforeRender: ()->
    console.log "Before Render On Form View"
    $(@el).append("<form />")
    @form = $('form', @el )

    @check_for_fieldsets()
    
    @components = _( @components ).map (fieldset, index)=>
      fieldset.renderTo = fieldset.container = @form
      fieldset.id = "#{ @cid }-#{ index }"
      new Luca.containers.FieldsetView(fieldset)

    console.log "Components On Form View", @components

  fieldsets_present : ()-> 
    _( @components ).detect (obj)-> obj.ctype is "fieldset"

  check_for_fieldsets: ()->
    unless @fieldsets_present()
      @components = [ 
        ctype: 'fieldset_view'
        components: @components
      ]

  afterRender: ()->
    console.log "Rendering Form View"
    _( @components ).each (component)-> 
      component.render()

    $(@container).append $(@el)


Luca.register 'form_view', 'Luca.components.FormView'
