# The `Docs.components.ApiBrowser` is an example of using
# a `Luca.Container` with a `@componentEvents` configuration
# to broker communication between two child components.
view = Docs.register        "Docs.components.ApiBrowser"
view.extends                "Luca.Container"

view.configuration
  componentEvents:
    "* button:click" : "loadUrl"

view.contains
  type: "container"
  rowFluid: true
  className: "url-selector"
  components:[
    type: "text_field"
    name: "endpoint_url"
    label: "Enter a URL"
    span: 9
  ,
    type: "button_field"
    input_value: "Browse"
    span: 3
  ]
,
  tagName: "pre"
  className: "prettyprint pre-scrollable"
  role: "output"
  afterInitialize: ()->
    @$el.html("Loading...")

view.privateMethods
  runExample: ()->
    console.log "Running example"
    @findComponentByName("endpoint_url", true).setValue("https://api.github.com/users/datapimp/gists")
    @loadUrl()

  loadUrl: ()->
    url = @findComponentByName("endpoint_url", true).getValue()
    $.get url, (parsed, state, options)=>
      @getOutput().$html( options.responseText )
      window.prettyPrint()

view.register()