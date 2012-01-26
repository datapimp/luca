Luca.core.Field = Luca.View.extend
  className: 'luca-ui-text-field luca-ui-field'
  
  isField: true

  template: 'fields/text_field'
   
  labelAlign: 'top'

  hooks:[
    "before:validation",
    "after:validation",
    "on:change"
  ]

  initialize: (@options={})->
    _.extend @, @options
    Luca.View.prototype.initialize.apply(@, arguments)

    @input_id ||= _.uniqueId('field') 
    @input_name ||= @name 
    @helperText ||= ""
    @label ||= "*#{ @label }" if @required and not @label?.match(/^\*/)
    @inputStyles ||= ""
    
  beforeRender: ()->
    $(@el).addClass('required') if @required
    $(@el).html Luca.templates[ @template ]( @ )
    @input = $('input', @el)
  
  render: ()->
    $( @container ).append( $(@el) )

  setValue: (value)-> 
    @input.attr('value', value)

  getValue: ()-> 
    @input.attr('value')
  
  change_handler: (e)->
    @trigger "on:change", @, e 
