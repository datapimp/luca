checkboxField = Luca.register         "Luca.fields.CheckboxField"

checkboxField.extends                 "Luca.core.Field"

checkboxField.triggers                "checked",
                                      "unchecked"

checkboxField.publicConfiguration
  send_blanks: true
  input_value: 1

checkboxField.privateConfiguration
  template: 'fields/checkbox_field'
  events:
    "change input" : "change_handler"

checkboxField.privateInterface
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

    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @label ||= @name

checkboxField.publicInterface
  setValue: (checked)->
    @getInputElement().attr('checked', checked)

  getValue:()->
    @getInputElement().is(":checked")

checkboxField.defines
  version: 1