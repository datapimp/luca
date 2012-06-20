Luca.templates.sample_collection_template = (item)-> "<strong>#{ item.model.get('name') }</strong>"

_.def("Sandbox.views.SampleComponent").extends("Luca.containers.CardView").with
  name: "sample_component"
  bottomToolbar:
    buttons:[
      label: "Inspect Component"
    ]
  components:[
    ctype: "split_view"
    components:[
      ctype: "form_view"
      toolbar: false
      components:[
        ctype: "type_ahead_field"
        label: "Search"
        helperText: "Search For A Component"
      ]
    ,
      ctype: "collection_view"
      collection: new Luca.Collection(url:"/sandbox/api.js")
      deferrable: true
      itemTagName: "div"
      itemTemplate: "sample_collection_item"
    ]
  ]
