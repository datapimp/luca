Sandbox.views.GridDemo = Luca.components.GridView.extend
  collection:
    url: "/sandbox/api.js"

  afterInitialize: ()->
    @bind "activation", ()=>
       @resize( @$container().width() )

  afterRender: ()->
    Luca.components.GridView.prototype.afterRender?.apply @, arguments
    @$el.parent().append Luca.templates["features/grid_demo_code"]
    prettyPrint()

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
