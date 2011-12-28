Sandbox.views.GridDemo = Luca.components.GridView.extend
  store: 
    base_url: '/sandbox/api'
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
