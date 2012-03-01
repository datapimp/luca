(function() {

  Luca.CollectionManager = (function() {

    CollectionManager.prototype.__collections = {};

    function CollectionManager(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.extend(this, Backbone.Events);
      if (Luca.CollectionManager.get) {
        console.log("A collection manager has already been created.  You are responsible for telling your views which to use");
      } else {
        Luca.CollectionManager.get = _.bind(function() {
          return this;
        }, this);
      }
    }

    CollectionManager.prototype.add = function(key, collection) {
      return this.currentScope()[key] = collection;
    };

    CollectionManager.prototype.allCollections = function() {
      return _(this.currentScope()).values();
    };

    CollectionManager.prototype.create = function(key, collectionOptions, initialModels, private) {
      var CollectionClass, collection;
      if (collectionOptions == null) collectionOptions = {};
      if (initialModels == null) initialModels = [];
      if (private == null) private = false;
      CollectionClass = collectionOptions.base;
      CollectionClass || (CollectionClass = this.guessCollectionClass(key));
      if (private || collectionOptions.private) {
        collectionOptions.registerWith = "";
      }
      collection = new CollectionClass(initialModels, collectionOptions);
      this.add(key, collection);
      return collection;
    };

    CollectionManager.prototype.collectionPrefix = Luca.Collection.namespace;

    CollectionManager.prototype.currentScope = function() {
      var current_scope, _base;
      if (current_scope = this.getScope()) {
        return (_base = this.__collections)[current_scope] || (_base[current_scope] = {});
      } else {
        return this.__collections;
      }
    };

    CollectionManager.prototype.each = function(fn) {
      return _(this.all()).each(fn);
    };

    CollectionManager.prototype.get = function(key) {
      return this.currentScope()[key];
    };

    CollectionManager.prototype.getScope = function() {
      return;
    };

    CollectionManager.prototype.getOrCreate = function(key, collectionOptions, initialModels) {
      if (collectionOptions == null) collectionOptions = {};
      if (initialModels == null) initialModels = [];
      return this.get(key) || this.create(key, collectionOptions, initialModels, false);
    };

    CollectionManager.prototype.guessCollectionClass = function(key) {
      var classified, guess;
      classified = _(key).chain().capitalize().camelize().value();
      guess = (this.collectionPrefix || (window || global))[classified];
      return guess;
    };

    CollectionManager.prototype.private = function(key, collectionOptions, initialModels) {
      if (collectionOptions == null) collectionOptions = {};
      if (initialModels == null) initialModels = [];
      return this.create(key, collectionOptions, initialModels, true);
    };

    return CollectionManager;

  })();

}).call(this);
