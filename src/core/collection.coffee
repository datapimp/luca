Luca.Collection = Backbone.Collection.extend
  base: 'Luca.Collection'

Luca.Collection.original_extend = Backbone.Collection.extend

Luca.Collection.extend = (definition)->
  Luca.Collection.original_extend.apply @, [definition]

_.extend Luca.Collection.prototype
 
