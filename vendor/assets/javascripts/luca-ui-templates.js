(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/bootstrap_form_controls"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="btn-group form-actions">\n  <a class="btn btn-primary submit-button">\n    <i class="icon icon-ok icon-white"></i>\n    Save Changes\n  </a>\n  <a class="btn reset-button cancel-button">\n    <i class="icon icon-remove"></i>\n    Cancel\n  </a>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/collection_loader_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div id="progress-modal" class="modal" style="display: none">\n  <div class="progress progress-info progress-striped active">\n    <div class="bar" style="width:0%;"></div>\n  </div>\n  <div class="message">Initializing...</div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/form_alert"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="', className ,'">\n  <a class="close" href="#" data-dismiss="alert">x</a>\n  ', message ,'\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/grid_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="luca-ui-g-view-wrapper">\n  <div class="g-view-header"></div>\n  <div class="luca-ui-g-view-body">\n    <table class="luca-ui-g-view scrollable-table" width="100%" cellpadding=0 cellspacing=0>\n      <thead class="fixed"></thead>\n      <tbody class="scrollable"></tbody>\n      <tfoot></tfoot>\n    </table>\n  </div>\n  <div class="luca-ui-g-view-header"></div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/grid_view_empty_text"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="empty-text empty-text-wrapper">\n  <p>', text ,'</p>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/load_mask"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="load-mask">\n  <div class="progress progress-striped active">\n    <div class="bar" style="width:0%"></div>\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/nav_bar"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="navbar-inner">\n  <div class="luca-ui-navbar-body container">\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/pagination"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="pagination">\n  <a class="btn previous">\n    <i class="icon icon-chevron-left"></i>\n  </a>\n  <div class="pagination-group">\n  </div>\n  <a class="btn next">\n    <i class="icon icon-chevron-right"></i>\n  </a>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/containers/basic"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div id="', id ,'" class="', classes ,'" style="', style ,'"></div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/containers/tab_selector_container"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div id="', cid ,'-tab-selector" class="tab-selector-container">\n  <ul id="', cid ,'-tabs-nav" class="nav nav-tabs">\n    '); for(var i = 0; i < components.length; i++ ) { __p.push('\n    '); var component = components[i];__p.push('\n    <li class="tab-selector" data-target="', i ,'">\n      <a data-target="', i ,'">\n        ', component.title ,'\n      </a>\n    </li>\n    '); } __p.push('\n  </ul>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/containers/tab_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<ul id="', cid ,'-tabs-selector" class="nav ', navClass ,'"></ul>\n<div id="', cid ,'-tab-view-content" class="tab-content"></div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/containers/toolbar_wrapper"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="luca-ui-toolbar-wrapper" id="', id ,'"></div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/button_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label>&nbsp;</label>\n<input style="', inputStyles ,'" class="btn ', input_class ,'" value="', input_value ,'" type="', input_type ,'" id="<%= input_id" />\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/button_field_link"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<a class="btn ', input_class ,'">\n  '); if(icon_class.length) { __p.push('\n  <i class="', icon_class ,'"></i>\n  ', input_value ,'\n  '); } __p.push('\n</a>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/checkbox_array"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="control-group">\n  <label for="', input_id ,'"><%= label =>\n  <div class="controls"><div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/checkbox_array_item"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  <input id="', input_id ,'" type="checkbox" name="', input_name ,'" value="', value ,'" />\n</label>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/checkbox_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  ', label ,'\n  <input type="checkbox" name="', input_name ,'" value="', input_value ,'" style="', inputStyles ,'" />\n</label>\n\n'); if(helperText) { __p.push('\n<p class="helper-text help-block">\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/file_upload_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  ', label ,'\n  <input type="file" name="', input_name ,'" value="', input_value ,'" style="', inputStyles ,'" />\n</label>\n\n'); if(helperText) { __p.push('\n<p class="helper-text help-block">\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/hidden_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push(' <input type="hidden" name="', input_name ,'" value="', input_value ,'" style="', inputStyles ,'" />\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/select_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  ', label ,'\n</label>\n<div class="controls">\n <select name="', input_name ,'" value="', input_value ,'" style="', inputStyles ,'" ></select>\n  '); if(helperText) { __p.push('\n  <p class="helper-text help-block">\n    ', helperText ,'\n  </p>\n  '); } __p.push('\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/text_area_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  ', label ,'\n</label>\n<div class="controls">\n <textarea name="', input_name ,'" style="', inputStyles ,'" >', input_value ,'</textarea>\n  '); if(helperText) { __p.push('\n  <p class="helper-text help-block">\n    ', helperText ,'\n  </p>\n  '); } __p.push('\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/text_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push(''); if(typeof(label)!=="undefined" && (typeof(hideLabel) !== "undefined" && !hideLabel) || (typeof(hideLabel)==="undefined")) {__p.push('\n<label class="control-label" for="', input_id ,'">', label ,'</label>\n'); } __p.push('\n\n<div class="controls">\n'); if( typeof(addOn) !== "undefined" ) { __p.push('\n  <span class="add-on">', addOn ,'</span>\n'); } __p.push('\n<input type="text" name="', input_name ,'" style="', inputStyles ,'" value="', input_value ,'" />\n'); if(helperText) { __p.push('\n<p class="helper-text help-block">\n  ', helperText ,'\n</p>\n'); } __p.push('\n\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/table_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<thead></thead>\n<tbody class="table-body"></tbody>\n<tfoot></tfoot>\n<caption></caption>\n');}return __p.join('');};
}).call(this);
