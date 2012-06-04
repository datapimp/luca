_.def("Luca.tools.ComponentTester").extends("Luca.core.Container").with
  name: "component_tester"

  className:"span11"

  components:[
    id: 'output'
    ctype: 'view'
    name: "component_tester_output"
    bodyTemplate: "code_tester"
  ,
    ctype: "code_editor"
    name: "component_tester_editor"
    className: 'font-small'
    minHeight:'300px'
    topToolbar:
      buttons:[
        icon: "refresh"
        align: "right"
        description: "refresh the output of your component setup"
        eventId: "click:refresh"
      ,
        icon: "plus"
        align: "left"
        description: "add a new component to test"
        eventId: "click:add"
      ,
        icon: "folder-open"
        align: "left"
        description: "open an existing component definition"
        eventId: "click:open"
      ]

    bottomToolbar:
      buttons:[
        label: "Setup"
        eventId: "edit:setup"
        description: "Edit the setup for your component test"
        align: "left"
      ,
        label: "Teardown"
        eventId: "edit:teardown"
        description: "Edit the teardown for your component test"
      ,
        label: "Definitions"
        eventId: "edit:components"
        description: "Edit the component itself"
      ,
        label: "Implementation"
        eventId: "edit:implementation"
        description: "Implement your component"
      ,
        icon: "cog"
        align: 'right'
        eventId: "click:settings"
        description : "component tester settings"
      ,
        icon: "eye-close"
        align: "right"
        eventId: "click:hide"
        description: "hide the tester controls"
      ]
  ]

  debugMode: true

  componentEvents:
    "component_tester_editor click:refresh" : "refreshCode"
    "component_tester_editor click:hide" : "toggleControls"
    "component_tester_editor click:settings" : "toggleSettings"
    "component_tester_editor click:add" : "addComponent"
    "component_tester_editor click:open" : "openComponent"
    "component_tester_editor eval:error" : "onError"
    "component_tester_editor eval:success" : "onSuccess"

  initialize: ()->
    Luca.core.Container::initialize.apply(@, arguments)

    for key, value of @componentEvents
      @[ value ] = _.bind(@[value], @)

  getEditor: ()->
    Luca("component_tester_editor")

  onError: ()->
    console.log "Error", arguments

  onSuccess: ()->
    console.log "Success", arguments

  refreshCode: ()->
    @debug "refreshing code"
    @findComponentByName("component_tester_editor").evaluateCode()

  toggleControls: ()->
    @debug "toggling controls"

  toggleSettings: ()->
    @debug "toggle settings"

  addComponent: ()->
    @debug "add components"

  openComponent: ()->
    @debug "open component"

  afterRender: ()->
    @$('#output').css('min-height','400px')
