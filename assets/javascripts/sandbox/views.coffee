Sandbox.Main = Luca.containers.SplitView.extend
  el: '#viewport'
  name : 'viewport'
  layout: '100'
  components:[
    height: 125
    ctype: 'form_view'
    fields:[
      type: 'select' 
      label: 'Sample Select'
      name: 'select'
      valueField: 'id'
      displayField: 'name'
      store:
        base_url: "/sandbox/api"
        base_params: 
          limit: 10
    ,
      type: 'checkbox'
      name: 'checkbox'
      label: 'Sample Checkbox'
    ]
  ,
    ctype: 'grid_view'
    store:
      base_url: "/sandbox/api"
      base_params:
        limit: 50
    columns:[
      header: "Name"
      data: "name"
    ,
      header: "Location"
      data: "location"
    ,
      header: "Email",
      data: "email"
    ,
      header: "Website"
      data: 'website'
    ]
  ]

Luca.registry.addNamespace('Sandbox.views')
