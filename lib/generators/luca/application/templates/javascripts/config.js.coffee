window.<%= javascript_namespace %> =
  views: {}
  collections: {}
  models: {}
  util: {}
  components: {}

Luca.registry.addNamespace '<%= javascript_namespace %>.views'
Luca.Collection.namespace = <%= javascript_namespace %>.collections
