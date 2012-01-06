Luca.fields.TextField = Luca.core.Field.extend
  events:
    "keydown input" : "keydown_handler"

  template: 'fields/text_field'

  initialize: (@options={})->
    console.log "Initializing Text Field", @cid
    _.bindAll @, "keydown_handler"
    Luca.core.Field.prototype.initialize.apply @, arguments

  keydown_handler: (e)->
    me = my = $( e.currentTarget )
    console.log "keydown", me

Luca.register "text_field", "Luca.fields.TextField"


