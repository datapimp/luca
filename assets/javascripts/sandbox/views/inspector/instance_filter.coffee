_.def("Sandbox.views.InstanceFilter").extends("Luca.components.FormView").with
  name: "instance_filter"
  well: true
  horizontal: true
  inline: true
  toolbar: false
  components:[
    ctype:"type_ahead_field"
    label:"Find by name"
    source: ()-> 
      names = _( Luca.registry.instances() ).pluck('name')
      _.uniq _( names ).compact()
  ,
    ctype: "type_ahead_field"
    label: "Find by class"
    source: ()->
      Luca.registry.classes(true)
  ]