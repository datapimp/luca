Luca.Collection = Backbone.Collection.extend
  base: 'Luca.Collection'

Luca.Collection.original_extend = Backbone.Collection.extend

Luca.Collection.extend = (definition)->
  Luca.Collection.original_extend.apply @, [definition]

Luca.Collection._baseParams = {}
Luca.Collection.baseParams = (obj)->
  Luca.Collection._baseParams = obj if obj
  return if obj 

  if _.isFunction( Luca.Collection._baseParams )
    return Luca.Collection._baseParams.call()
  
  if _.isObject( Luca.Collection._baseParams )
    Luca.Collection._baseParams

_.extend Luca.Collection.prototype,
 fetch: (options)->
   @trigger "before:fetch", @
   @fetching = true
  
   url = if _.isFunction(@url) then @url() else @url

   return true unless url and url.length > 1

   try
     Backbone.Collection.prototype.fetch.apply @, arguments
   catch e
     console.log "Error in Collection.fetch", e

  ifLoaded: (fn, scope=@)->
    if @models.length > 0 and not @fetching
      fn.apply scope, @

    @bind "reset", (collection)=>
      fn.apply scope, [collection]

    unless @fetching
      @fetch()

  parse: (response)-> if @root? then response[ @root ] else response

