(function() {

  Luca.components.FilterableCollection = Luca.Collection.extend({
    initialize: function(models, options) {
      var params, url,
        _this = this;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      Luca.Collection.prototype.initialize.apply(this, arguments);
      this.filter = Luca.Collection.baseParams();
      if (_.isFunction(this.url)) {
        return this.url = _.wrap(this.url, function(fn) {
          var existing_params, new_val, parts, queryString, val;
          val = fn.apply(_this);
          parts = val.split('?');
          if (parts.length > 1) existing_params = _.last(parts);
          queryString = _this.queryString();
          if (existing_params && val.match(existing_params)) {
            queryString = queryString.replace(existing_params, '');
          }
          new_val = "" + val + "?" + queryString;
          if (new_val.match(/\?$/)) new_val = new_val.replace(/\?$/, '');
          return new_val;
        });
      } else {
        url = this.url;
        params = this.queryString();
        return this.url = _([url, params]).compact().join("?");
      }
    },
    queryString: function() {
      var parts,
        _this = this;
      parts = _(this.filter).inject(function(memo, value, key) {
        var str;
        str = "" + key + "=" + value;
        memo.push(str);
        return memo;
      }, []);
      return _.uniq(parts).join("&");
    },
    applyFilter: function(filter, options) {
      if (filter == null) filter = {};
      if (options == null) {
        options = {
          auto: true,
          refresh: true
        };
      }
      _.extend(this.filter, filter);
      if (!!options.auto) return this.fetch(options);
    }
  });

}).call(this);
