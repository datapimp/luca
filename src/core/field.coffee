Luca.core.Field = Luca.View.extend
  className: 'luca-ui-text-field luca-ui-field'
  
  template: 'fields/text_field'
  
  labelAlign: 'top'

  hooks:[
    "before:validation",
    "after:validation"
  ]

  initialize: (@options={})->
    _.extend @, @options
    Luca.View.prototype.initialize.apply(@, arguments)
    @setupHooks( @hooks )
  
  afterInitialize: ()->
    @input_id ||= _.uniqueId('field') 
    @input_name ||= @name 
    
  render_field: ()->
    $(@el).html Luca.templates[ @template ]( @ )
    $( @container ).append( $(@el) )
