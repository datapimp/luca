class Luca.LocalStore
  
  # think of name the way you would a table in a mysql db
  constructor: (@name)->
    store = localStorage.getItem(@name)
    @data = ( store && JSON.parse(store) ) || {}

  guid: ()->
    S4 = ()-> (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
  
  # serialize the store into JSON and put it in the localStorage
  save: ()->
    localStorage.setItem(@name, JSON.stringify(@data) )
   
  create: (model)->
    model.id = model.attribtues.id = @guid() unless model.id
    @data[ model.id ] = model
    @save()
    model

  update: (model)->
    @data[model.id] = model
    @save()
    model
  
  find: (model)-> @data[ model.id ]
  
  findAll: ()-> 
    _.values( @data )

  destroy: (model)->
    delete @data[ model.id ]
    @save()
    model

Backbone.LocalSync = (method, model, options)->
  store = model.localStorage || model.collection.localStorage

  resp = switch method
    when "read" then (if model.id then store.find(model) else store.findAll())
    when "create" then store.create(model)
    when "update" then store.update(model)
    when "delete" then store.destroy(model)
  
  if resp
    options.success(resp)
  else
    options.error("Record not found")

