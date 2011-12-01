(function() {
  var UnderscoreMixins;
  UnderscoreMixins = {
    classify: function(string) {
      var str;
      str = _(string).camelize();
      return str.charAt(0).toUpperCase() + str.substring(1);
    },
    camelize: function(string) {
      return string.replace(/_+(.)?/g, function(match, chr) {
        if (chr != null) {
          return chr.toUpperCase();
        }
      });
    },
    underscore: function(string) {
      return string.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/-/g, '_').toLowerCase();
    },
    module: function(base, module) {
      _.extend(base, module);
      if (base.included && _(base.included).isFunction()) {
        return base.included.apply(base);
      }
    }
  };
  _.mixin(UnderscoreMixins);
  Date.prototype.toUTCArray = function() {
    var D;
    D = this;
    return [D.getUTCFullYear(), D.getUTCMonth(), D.getUTCDate(), D.getUTCHours(), D.getUTCMinutes(), D.getUTCSeconds()];
  };
  Date.prototype.toISO = function() {
    var A, i, temp;
    A = this.toUTCArray();
    i = 0;
    A[1] += 1;
    while (i++ < 7) {
      temp = A[i];
      if (temp < 10) {
        A[i] = "0" + temp;
      }
    }
    return A.splice(0, 3).join('-') + 'T' + A.join(':');
  };
  Date.fromISO = function(str) {
    var dateParts, parts, timeHours, timeParts, timeSecParts, timeSubParts, _date;
    parts = str.split('T');
    dateParts = parts[0].split('-');
    timeParts = parts[1].split('Z');
    timeSubParts = timeParts[0].split(':');
    timeSecParts = timeSubParts[2].split('.');
    timeHours = Number(timeSubParts[0]);
    _date = new Date;
    _date.setUTCFullYear(Number(dateParts[0]));
    _date.setUTCMonth(Number(dateParts[1]) - 1);
    _date.setUTCDate(Number(dateParts[2]));
    _date.setUTCHours(Number(timeHours));
    _date.setUTCMinutes(Number(timeSubParts[1]));
    _date.setUTCSeconds(Number(timeSecParts[0]));
    if (timeSecParts[1]) {
      _date.setUTCMilliseconds(Number(timeSecParts[1]));
    }
    return _date;
  };
  Array.prototype.remove = function(from, to) {
    var rest;
    rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };
}).call(this);
(function() {
  window.Luca = {
    base: {},
    components: {},
    layouts: {},
    util: {}
  };
}).call(this);
(function() {
  Luca.util || (Luca.util = {});
  Luca.util.classify = function(string) {};
}).call(this);
(function() {
  Luca.base.View = Backbone.View.extend({
    component_type: 'view'
  });
}).call(this);
(function() {

}).call(this);
(function() {
  Luca.components.ColumnModel = (function() {
    function ColumnModel(options) {
      this.options = options;
      _.extend(this, Backbone.Events);
    }
    return ColumnModel;
  })();
}).call(this);
(function() {
  Luca.components.Container = Luca.base.View.extend({
    component_type: 'container',
    layout: 'layout',
    initialize: function(options) {
      this.options = options != null ? options : {};
      return this.applyLayout();
    },
    getLayout: function() {
      if (!this.layout.match(/_layout$/)) {
        this.layout += "_layout";
      }
      return this.layout_class = new (Luca.layouts[_(this.layout).classify()] || Luca.layouts.Layout);
    },
    applyLayout: function() {
      return this.getLayout().render();
    }
  });
}).call(this);
(function() {
  Luca.components.Field = Luca.base.View.extend({
    component_type: 'field'
  });
}).call(this);
(function() {
  Luca.components.Form = Luca.base.View.extend({
    component_type: 'form'
  });
}).call(this);
(function() {
  Luca.components.Grid = Luca.base.View.extend({
    component_type: 'grid'
  });
}).call(this);
(function() {
  Luca.components.Layout = Luca.base.View.extend({
    component_type: 'layout'
  });
  Luca.layouts.Layout = Luca.components.Layout;
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Luca.layouts.CardLayout = Luca.components.Layout.extend({
    initialize: function(options) {
      this.options = options != null ? options : {};
      if (!!this.deferredRender) {
        return this.render();
      }
    },
    activeItem: 0,
    component_type: 'card_layout',
    deferredRender: false,
    setActiveItem: function(index) {
      this.trigger("cardchange", index, this.items[index]);
      return this.activeItem = index;
    },
    getActiveItem: function() {
      return this.items[this.activeItem];
    },
    render: function() {
      console.log("Rendering Card Layout to " + this.el);
      return _(this.items).each(__bind(function(item) {
        var item_id;
        item_id = item.css_id != null ? item.css_id : "element-" + (_.uniqueId());
        item.el = "#" + item_id;
        return $(this.el).append("<div id='" + item_id + "' class='luca-card' style='display:none;'></div>");
      }, this));
    }
  });
}).call(this);
(function() {
  Luca.layouts.ColumnLayout = Luca.components.Layout.extend({
    component_type: 'column_layout',
    initialize: function(options) {
      this.options = options;
    }
  });
}).call(this);
(function() {

}).call(this);





