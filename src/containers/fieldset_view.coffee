Luca.containers.FieldsetView = Luca.View.extend
  component_type: 'fieldset_view'

  tagName: 'fieldset'

  className: 'luca-ui-fieldset'

  labelAlign: 'top'
  
  afterInitialize: ()->
    return if @initialized is true

    @components = _( @components ).map (component, index)=>
      component.id = "#{ @cid }-#{ index }"
      component.ctype ||= component.type + '_field'
      Luca.util.LazyObject(component)
    
    # HACK.  Why is double initialization happening in the first place?
    @initialized = true
  
  beforeRender: ()->
    _( @components ).each (component)=> 
      component.renderTo = component.container = @el
      component.render()

  render: ()->
    $(@el).addClass "label-align-#{ @labelAlign }" 
    $(@el).append("<legend>#{ @legend }</legend>") if @legend
    $( @container ).append( $(@el) ) 

  initialize: (@options={})->
    _.extend @, @options
    Luca.View.prototype.initialize.apply @, arguments
    @components ||= @fields

