(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["containers/tab_selector_container"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<ul class=\'nav nav-tabs\' id=\'', cid ,'-tab-selector\'>\n  '); for(var i = 0; i < components.length; i++ ) { __p.push('\n  '); var component = components[i];__p.push('\n  <li class=\'tab-selector\' data-target=\'', i ,'\'>\n    <a data-target=\'', i ,'\'>\n      ', component.title ,'\n    </a>\n  </li>\n  '); } __p.push('\n</ul>\n');}return __p.join('');};
}).call(this);
