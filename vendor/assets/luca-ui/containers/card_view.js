(function() {

  Luca.containers.CardView = Luca.core.Container.extend({
    componentType: 'card_view',
    className: 'luca-ui-card-view-wrapper',
    activeCard: 0,
    components: [],
    hooks: ['before:card:switch', 'after:card:switch'],
    initialize: function(options) {
      this.options = options;
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      return this.setupHooks(this.hooks);
    },
    componentClass: 'luca-ui-card',
    beforeLayout: function() {
      var _this = this;
      return this.cards = _(this.components).map(function(card, cardIndex) {
        return {
          classes: _this.componentClass,
          style: "display:" + (cardIndex === _this.activeCard ? 'block' : 'none'),
          id: "" + _this.cid + "-" + cardIndex
        };
      });
    },
    prepareLayout: function() {
      var _this = this;
      return this.card_containers = _(this.cards).map(function(card, index) {
        _this.$el.append(Luca.templates["containers/basic"](card));
        return $("#" + card.id);
      });
    },
    prepareComponents: function() {
      var _this = this;
      return this.components = _(this.components).map(function(object, index) {
        var card;
        card = _this.cards[index];
        object.container = "#" + card.id;
        return object;
      });
    },
    activeComponent: function() {
      return this.getComponent(this.activeCard);
    },
    cycle: function() {
      var nextIndex;
      nextIndex = this.activeCard < this.components.length - 1 ? this.activeCard + 1 : 0;
      return this.activate(nextIndex);
    },
    find: function(name) {
      return this.findComponentByName(name, true);
    },
    firstActivation: function() {
      return this.activeComponent().trigger("first:activation", this, this.activeComponent());
    },
    activate: function(index, silent, callback) {
      var current, previous, _ref;
      if (silent == null) silent = false;
      if (_.isFunction(silent)) {
        silent = false;
        callback = silent;
      }
      if (index === this.activeCard) return;
      previous = this.activeComponent();
      current = this.getComponent(index);
      if (!current) {
        index = this.indexOf(index);
        current = this.getComponent(index);
      }
      if (!current) return;
      if (!silent) this.trigger("before:card:switch", previous, current);
      _(this.card_containers).each(function(container) {
        var _ref;
        if ((_ref = container.trigger) != null) {
          _ref.apply(container, ["deactivation", this, previous, current]);
        }
        return container.hide();
      });
      if (!current.previously_activated) {
        current.trigger("first:activation");
        current.previously_activated = true;
      }
      $(current.container).show();
      this.activeCard = index;
      if (!silent) {
        this.trigger("after:card:switch", previous, current);
        if ((_ref = current.trigger) != null) {
          _ref.apply(current, ["activation", this, previous, current]);
        }
      }
      if (_.isFunction(callback)) {
        return callback.apply(this, [this, previous, current]);
      }
    }
  });

  Luca.register('card_view', "Luca.containers.CardView");

}).call(this);
