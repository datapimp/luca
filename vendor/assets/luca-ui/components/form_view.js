(function() {

  Luca.components.FormView = Luca.core.Container.extend({
    tagName: 'form',
    className: 'luca-ui-form-view',
    hooks: ["before:submit", "before:reset", "before:load", "before:load:new", "before:load:existing", "after:submit", "after:reset", "after:load", "after:load:new", "after:load:existing", "after:submit:success", "after:submit:fatal_error", "after:submit:error"],
    events: {
      "click .submit-button": "submitHandler",
      "click .reset-button": "resetHandler"
    },
    labelAlign: 'top',
    toolbar: true,
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "submitHandler", "resetHandler", "renderToolbars");
      this.state || (this.state = new Backbone.Model);
      this.setupHooks(this.hooks);
      this.legend || (this.legend = "");
      this.configureToolbars();
      return this.applyStyles();
    },
    addBootstrapFormControls: function() {
      var _this = this;
      return this.bind("after:render", function() {
        var el;
        el = _this.$('.toolbar-container.bottom');
        el.addClass('form-controls');
        return el.html(_this.formControlsTemplate || Luca.templates["components/bootstrap_form_controls"](_this));
      });
    },
    applyStyles: function() {
      if (Luca.enableBootstrap) return this.applyBootstrapStyles();
      this.$el.addClass("label-align-" + this.labelAlign);
      if (this.fieldLayoutClass) return this.$el.addClass(this.fieldLayoutClass);
    },
    applyBootstrapStyles: function() {
      if (this.labelAlign === "left") this.inlineForm = true;
      if (this.well) this.$el.addClass('well');
      if (this.searchForm) this.$el.addClass('form-search');
      if (this.horizontalForm) this.$el.addClass('form-horizontal');
      if (this.inlineForm) return this.$el.addClass('form-inline');
    },
    configureToolbars: function() {
      if (Luca.enableBootstrap) return this.addBootstrapFormControls();
      if (this.toolbar === true) {
        this.toolbars = [
          {
            ctype: 'form_button_toolbar',
            includeReset: true,
            position: 'bottom'
          }
        ];
      }
      if (this.toolbars && this.toolbars.length) {
        return this.bind("after:render", _.once(this.renderToolbars));
      }
    },
    resetHandler: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      this.trigger("before:reset", this);
      this.reset();
      return this.trigger("after:reset", this);
    },
    submitHandler: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      this.trigger("before:submit", this);
      return this.submit();
    },
    beforeLayout: function() {
      var _ref;
      if ((_ref = Luca.core.Container.prototype.beforeLayout) != null) {
        _ref.apply(this, arguments);
      }
      return this.$el.html(Luca.templates["components/form_view"](this));
    },
    prepareComponents: function() {
      var container;
      container = $('.form-view-body', this.el);
      return _(this.components).each(function(component) {
        return component.container = container;
      });
    },
    render: function() {
      return $(this.container).append(this.$el);
    },
    wrapper: function() {
      return this.$el.parents('.luca-ui-form-view-wrapper');
    },
    toolbarContainers: function(position) {
      if (position == null) position = "bottom";
      return $(".toolbar-container." + position, this.wrapper()).first();
    },
    renderToolbars: function() {
      var _this = this;
      return _(this.toolbars).each(function(toolbar) {
        toolbar.container = $("#" + _this.cid + "-" + toolbar.position + "-toolbar-container");
        toolbar = Luca.util.LazyObject(toolbar);
        return toolbar.render();
      });
    },
    getField: function(name) {
      return _(this.getFields('name', name)).first();
    },
    getFields: function(attr, value) {
      var fields;
      fields = this.select("isField", true, true);
      if (fields.length > 0 && attr && value) {
        fields = _(fields).select(function(field) {
          var property, propvalue;
          property = field[attr];
          if (property == null) return false;
          propvalue = _.isFunction(property) ? property() : property;
          return value === propvalue;
        });
      }
      return fields;
    },
    loadModel: function(current_model) {
      var event, fields, form,
        _this = this;
      this.current_model = current_model;
      form = this;
      fields = this.getFields();
      this.trigger("before:load", this, this.current_model);
      if (this.current_model) {
        event = "before:load:" + (this.current_model.isNew() ? "new" : "existing");
        this.trigger(event, this, this.current_model);
      }
      _(fields).each(function(field) {
        var field_name, value;
        field_name = field.input_name || field.name;
        value = _.isFunction(_this.current_model[field_name]) ? _this.current_model[field_name].apply(_this, form) : _this.current_model.get(field_name);
        if (field.readOnly !== true) {
          return field != null ? field.setValue(value) : void 0;
        }
      });
      this.trigger("after:load", this, this.current_model);
      if (this.current_model) {
        return this.trigger("after:load:" + (this.current_model.isNew() ? "new" : "existing"), this, this.current_model);
      }
    },
    reset: function() {
      return this.loadModel(this.current_model);
    },
    clear: function() {
      var _this = this;
      this.current_model = this.defaultModel != null ? this.defaultModel() : void 0;
      return _(this.getFields()).each(function(field) {
        try {
          return field.setValue('');
        } catch (e) {
          return console.log("Error Clearing", _this, field);
        }
      });
    },
    getValues: function(reject_blank, skip_buttons) {
      if (reject_blank == null) reject_blank = false;
      if (skip_buttons == null) skip_buttons = true;
      return _(this.getFields()).inject(function(memo, field) {
        var skip, value;
        value = field.getValue();
        skip = false;
        if (skip_buttons && field.ctype === "button_field") skip = true;
        if (reject_blank && _.isBlank(value)) skip = true;
        if (field.input_name === "id" && _.isBlank(value)) skip = true;
        if (!skip) memo[field.input_name || name] = value;
        return memo;
      }, {});
    },
    submit_success_handler: function(model, response, xhr) {
      this.trigger("after:submit", this, model, response);
      if (response && response.success) {
        return this.trigger("after:submit:success", this, model, response);
      } else {
        return this.trigger("after:submit:error", this, model, response);
      }
    },
    submit_fatal_error_handler: function() {
      this.trigger.apply(["after:submit", this].concat(arguments));
      return this.trigger.apply(["after:submit:fatal_error", this].concat(arguments));
    },
    submit: function(save, saveOptions) {
      if (save == null) save = true;
      if (saveOptions == null) saveOptions = {};
      _.bindAll(this, "submit_success_handler", "submit_fatal_error_handler");
      saveOptions.success || (saveOptions.success = this.submit_success_handler);
      saveOptions.error || (saveOptions.error = this.submit_fatal_error_handler);
      this.current_model.set(this.getValues());
      if (!save) return;
      return this.current_model.save(this.current_model.toJSON(), saveOptions);
    },
    currentModel: function() {
      return this.current_model;
    },
    setLegend: function(legend) {
      this.legend = legend;
      return $('fieldset legend', this.el).first().html(this.legend);
    }
  });

  Luca.register('form_view', 'Luca.components.FormView');

}).call(this);
