Sandbox.views.GridDemo = Luca.components.GridView.extend
  collection: "sandbox"

  afterInitialize: ()->
    @bind "activation", ()=>
      @resize( @$container().width() )

  columns:[
    header: "Name"
    data: 'name'
  ,
    header : "Location"
    data: "location"
  ,
    header : "Website"
    data: "website"
  ]
