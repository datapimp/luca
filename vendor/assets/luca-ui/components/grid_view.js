(function() {

  Luca.components.GridView = Luca.View.extend({
    events: {
      "dblclick .grid-view-row": "double_click_handler",
      "click .grid-view-row": "click_handler"
    },
    className: 'luca-ui-grid-view',
    scrollable: true,
    emptyText: 'No Results To display',
    tableStyle: 'striped',
    hooks: ["before:grid:render", "before:render:header", "before:render:row", "after:grid:render", "row:double:click", "row:click", "after:collection:load"],
    initialize: function(options) {
      var _this = this;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.extend(this, Luca.modules.Deferrable);
      Luca.View.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "double_click_handler", "click_handler");
      this.configure_collection();
      return this.collection.bind("reset", function(collection) {
        _this.refresh();
        return _this.trigger("after:collection:load", collection);
      });
    },
    beforeRender: function() {
      var _ref,
        _this = this;
      this.trigger("before:grid:render", this);
      if (this.scrollable) this.$el.addClass('scrollable-grid-view');
      this.$el.html(Luca.templates["components/grid_view"]());
      this.table = $('table.luca-ui-grid-view', this.el);
      this.header = $("thead", this.table);
      this.body = $("tbody", this.table);
      this.footer = $("tfoot", this.table);
      if (Luca.enableBootstrap) this.table.addClass('table');
      _((_ref = this.tableStyle) != null ? _ref.split(" ") : void 0).each(function(style) {
        return _this.table.addClass("table-" + style);
      });
      if (this.scrollable) this.setDimensions();
      this.renderHeader();
      this.emptyMessage();
      this.renderToolbars();
      return $(this.container).append(this.$el);
    },
    toolbarContainers: function(position) {
      if (position == null) position = "bottom";
      return $(".toolbar-container." + position, this.el);
    },
    renderToolbars: function() {
      var _this = this;
      return _(this.toolbars).each(function(toolbar) {
        toolbar = Luca.util.LazyObject(toolbar);
        toolbar.container = _this.toolbarContainers(toolbar.position);
        return toolbar.render();
      });
    },
    setDimensions: function(offset) {
      var _this = this;
      this.height || (this.height = 285);
      $('.grid-view-body', this.el).height(this.height);
      $('tbody.scrollable', this.el).height(this.height - 23);
      this.container_width = (function() {
        return $(_this.container).width();
      })();
      this.width = this.container_width > 0 ? this.container_width : 756;
      $('.grid-view-body', this.el).width(this.width);
      $('.grid-view-body table', this.el).width(this.width);
      return this.setDefaultColumnWidths();
    },
    resize: function(newWidth) {
      var difference, distribution,
        _this = this;
      difference = newWidth - this.width;
      this.width = newWidth;
      $('.grid-view-body', this.el).width(this.width);
      $('.grid-view-body table', this.el).width(this.width);
      if (this.columns.length > 0) {
        distribution = difference / this.columns.length;
        return _(this.columns).each(function(col, index) {
          var column;
          column = $(".column-" + index, _this.el);
          return column.width(col.width = col.width + distribution);
        });
      }
    },
    padLastColumn: function() {
      var configured_column_widths, unused_width;
      configured_column_widths = _(this.columns).inject(function(sum, column) {
        return sum = column.width + sum;
      }, 0);
      unused_width = this.width - configured_column_widths;
      if (unused_width > 0) return this.lastColumn().width += unused_width;
    },
    setDefaultColumnWidths: function() {
      var default_column_width;
      default_column_width = this.columns.length > 0 ? this.width / this.columns.length : 200;
      _(this.columns).each(function(column) {
        return parseInt(column.width || (column.width = default_column_width));
      });
      return this.padLastColumn();
    },
    lastColumn: function() {
      return this.columns[this.columns.length - 1];
    },
    afterRender: function() {
      this.refresh();
      return this.trigger("after:grid:render", this);
    },
    emptyMessage: function(text) {
      if (text == null) text = "";
      text || (text = this.emptyText);
      this.body.html('');
      return this.body.append(Luca.templates["components/grid_view_empty_text"]({
        colspan: this.columns.length,
        text: text
      }));
    },
    refresh: function() {
      var _this = this;
      this.body.html('');
      this.collection.each(function(model, index) {
        return _this.render_row.apply(_this, [model, index]);
      });
      if (this.collection.models.length === 0) return this.emptyMessage();
    },
    ifLoaded: function(fn, scope) {
      scope || (scope = this);
      fn || (fn = function() {
        return true;
      });
      return this.collection.ifLoaded(fn, scope);
    },
    applyFilter: function(values, options) {
      if (options == null) {
        options = {
          auto: true,
          refresh: true
        };
      }
      return this.collection.applyFilter(values, options);
    },
    renderHeader: function() {
      var headers,
        _this = this;
      this.trigger("before:render:header");
      headers = _(this.columns).map(function(column, column_index) {
        var style;
        style = column.width ? "width:" + column.width + "px;" : "";
        return "<th style='" + style + "' class='column-" + column_index + "'>" + column.header + "</th>";
      });
      return this.header.append("<tr>" + headers + "</tr>");
    },
    render_row: function(row, row_index) {
      var alt_class, cells, model_id, _ref,
        _this = this;
      model_id = (row != null ? row.get : void 0) && (row != null ? row.attributes : void 0) ? row.get('id') : '';
      this.trigger("before:render:row", row, row_index);
      cells = _(this.columns).map(function(column, col_index) {
        var display, style, value;
        value = _this.cell_renderer(row, column, col_index);
        style = column.width ? "width:" + column.width + "px;" : "";
        display = _.isUndefined(value) ? "" : value;
        return "<td style='" + style + "' class='column-" + col_index + "'>" + display + "</td>";
      });
      if (this.alternateRowClasses) {
        alt_class = row_index % 2 === 0 ? "even" : "odd";
      }
      return (_ref = this.body) != null ? _ref.append("<tr data-record-id='" + model_id + "' data-row-index='" + row_index + "' class='grid-view-row " + alt_class + "' id='row-" + row_index + "'>" + cells + "</tr>") : void 0;
    },
    cell_renderer: function(row, column, columnIndex) {
      var source;
      if (_.isFunction(column.renderer)) {
        return column.renderer.apply(this, [row, column, columnIndex]);
      } else if (column.data.match(/\w+\.\w+/)) {
        source = row.attributes || row;
        return Luca.util.nestedValue(column.data, source);
      } else {
        return (typeof row.get === "function" ? row.get(column.data) : void 0) || row[column.data];
      }
    },
    double_click_handler: function(e) {
      var me, my, record, rowIndex;
      me = my = $(e.currentTarget);
      rowIndex = my.data('row-index');
      record = this.collection.at(rowIndex);
      return this.trigger("row:double:click", this, record, rowIndex);
    },
    click_handler: function(e) {
      var me, my, record, rowIndex;
      me = my = $(e.currentTarget);
      rowIndex = my.data('row-index');
      record = this.collection.at(rowIndex);
      this.trigger("row:click", this, record, rowIndex);
      $('.grid-view-row', this.body).removeClass('selected-row');
      return me.addClass('selected-row');
    }
  });

  Luca.register("grid_view", "Luca.components.GridView");

}).call(this);
