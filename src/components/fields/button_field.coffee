_.def('Luca.fields.ButtonField').extends('Luca.core.Field').with

buttonField = Luca.register         "Luca.fields.ButtonField"

buttonField.extends                 "Luca.core.Field"

buttonField.triggers                "button:click"

buttonField.publicConfiguration
  readOnly: true
  input_type: "button" 
  input_value: undefined 
  icon_class: undefined
  input_name: undefined
  white: undefined

buttonField.privateConfiguration
  events:
    "click input" : "click_handler"
  template: 'fields/button_field'

buttonField.privateInterface
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
    @input_class ||= @class
    @icon_class ||= ""
    @icon_class = "icon-#{ @icon_class }" if @icon_class.length and !@icon_class.match(/^icon-/)
    @icon_class += " icon-white" if @white

  setValue: ()-> true

buttonField.defines
  version: 1