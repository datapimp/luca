_.def('Luca.fields.ButtonField').extends('Luca.core.Field').with

  readOnly: true

  events:
    "click input" : "click_handler"

  hooks:[
    "button:click"
  ]

  className: 'luca-ui-field luca-ui-button-field'

  template: 'fields/button_field'

  click_handler: (e)->
    me = my = $( e.currentTarget )
    @trigger "button:click"

  initialize: (@options={})->
    _.extend @options
    _.bindAll @, "click_handler"

    Luca.core.Field::initialize.apply @, arguments

    @template = "fields/button_field_link" if @icon_class?.length

  afterInitialize: ()->
    @input_id ||= _.uniqueId('button')
    @input_name ||= @name ||= @input_id
    @input_value ||= @label ||= @text
    @input_type ||= "button"
    @input_class ||= @class
    @icon_class ||= ""
    @icon_class = "icon-#{ @icon_class }" if @icon_class.length and !@icon_class.match(/^icon-/)
    @icon_class += " icon-white" if @white

  setValue: ()-> true