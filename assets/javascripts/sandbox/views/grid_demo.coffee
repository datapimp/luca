Sandbox.views.GridDemo = Luca.components.GridView.extend
  collection: 
    url: "/sandbox/api"

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
