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

view.privateMethods
  runExample: ()->
    @findComponentByName("endpoint_url", true).setValue("https://api.github.com/users/datapimp/gists")
    @loadUrl()

  loadUrl: ()->
    url = @findComponentByName("endpoint_url", true).getValue()
    console.log "Loading Url", url
    $.get url, (parsed, state, options)=>
      @getOutput().$html( options.responseText )
      window.prettyPrint()

view.register()