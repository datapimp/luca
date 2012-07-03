_.def("Sandbox.views.BuilderEditor").extends("Luca.tools.CoffeeEditor").with
  name: "builder_editor"

  bottomToolbar:
    buttons:[
      eventId:"toggle:source"
      label:"mode: coffeescript"
    ]

  toggleSource:()->
    @_super("toggleMode", @, arguments)
    @updateToggleSourceButton()

  updateToggleSourceButton: ()->
    @$('[data-eventid="toggle:source"]').html("mode: #{ @currentMode() }")
