_.def('Luca.fields.CheckboxField').extends('Luca.core.Field').with

  events:
    "change input" : "change_handler"

  className: 'luca-ui-checkbox-field luca-ui-field'
  template: 'fields/checkbox_field'
  hooks: ["checked","unchecked"]
  send_blanks: true

  change_handler: (e)->
    me = my = $(e.target)

    if me.is(":checked")
      @trigger "checked"
    else
      @trigger "unchecked"

    @trigger "on:change", @, e, me.is(":checked")

  initialize: (@options={})->
    _.extend @, @options
    _.bindAll @, "change_handler"

    Luca.core.Field::initialize.apply @, arguments

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @input_value ||= 1
    @label ||= @name

  setValue: (checked)->
    @getInputElement().attr('checked', checked)

  getValue:()->
    @getInputElement().is(":checked")