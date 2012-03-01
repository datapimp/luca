(function() {

  Luca.components.FormButtonToolbar = Luca.components.Toolbar.extend({
    className: 'luca-ui-form-toolbar form-actions',
    position: 'bottom',
    includeReset: false,
    render: function() {
      return $(this.container).append(this.el);
    },
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.components.Toolbar.prototype.initialize.apply(this, arguments);
      this.components = [
        {
          ctype: 'button_field',
          label: 'Submit',
          "class": 'btn submit-button'
        }
      ];
      if (this.includeReset) {
        return this.components.push({
          ctype: 'button_field',
          label: 'Reset',
          "class": 'btn reset-button'
        });
      }
    }
  });

  Luca.register("form_button_toolbar", "Luca.components.FormButtonToolbar");

}).call(this);
