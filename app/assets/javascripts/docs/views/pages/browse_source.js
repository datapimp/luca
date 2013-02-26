(function(){var e;e=Docs.register("Docs.views.ComponentDetails"),e["extends"]("Luca.Container"),e.configuration({rowFluid:!0}),e.contains({role:"documentation",span:5,loadComponent:function(e){return this.$el.empty(),this.$el.append("<h2>"+e.get("class_name")+"</h2>"),this.$el.append("<div class='header-documentation'>"+e.get("header_documentation")+"</div>")}},{type:"component_documentation",role:"details",displaySource:!0,span:7}),e.defines({afterRender:function(){return this.getDetails().$el.hide(),this.getDocumentation().$el.hide()},load:function(e){return this.getDetails().$el.show(),this.getDocumentation().$el.show(),this.getDetails().loadComponent(e),this.getDocumentation().loadComponent(e),this.prettyPrint()},prettyPrint:function(){return this.$("pre").addClass("prettyprint"),typeof window.prettyPrint=="function"?window.prettyPrint():void 0}})}).call(this),function(){var e;e=Docs.register("Docs.views.ComponentList"),e["extends"]("Luca.components.ScrollableTable"),e.defines({paginatable:!1,maxHeight:200,collection:"luca_documentation",columns:[{reader:"class_name",width:"20%",renderer:function(e){return"<a class='link'>"+e+"</a>"}},{reader:"class_name",header:"Extends From",width:"20%",renderer:function(e){var t,n,r;if(t=Luca.util.resolve(e))return n=(r=t.prototype.componentMetaData())!=null?r.meta["super class name"]:void 0,"<a class='link'>"+n+"</a>"}},{reader:"type_alias",header:"Shortcut",width:"10%"},{reader:"defined_in_file",header:"<i class='icon icon-github'/> Github",renderer:function(e){var t;return t=e.split("javascripts/luca/")[1],"<a href='https://github.com/datapimp/luca/blob/master/app/assets/javascripts/luca/"+t+"'>"+t+"</a>"}}]})}.call(this),function(){var e;e=Docs.register("Docs.views.BrowseSource"),e["extends"]("Luca.Container"),e.configuration({autoBindEventHandlers:!0,events:{"click .docs-component-list a.link":"selectComponent"}}),e.contains({component:"component_list"},{component:"component_details"}),e.privateMethods({index:function(){return this.selectComponent(this.getComponentList().getCollection().at(0))},show:function(e){var t;return t=this.getComponentList().getCollection().detect(function(t){return t.get("class_name")===e}),t==null?this.index():this.selectComponent(t)},selectComponent:function(e){var t,n,r,i,s,o;return i=this.getComponentList(),n=this.getComponentDetails(),Luca.isBackboneModel(e)?(s=e,r=i.getCollection().indexOf(s),o=i.$("tr[data-index='"+r+"']")):(t=this.$(e.target),o=t.parents("tr").eq(0),r=o.data("index"),s=i.getCollection().at(r)),i.$("tr").removeClass("info"),o.addClass("info"),n.load(s),Docs().router.navigate("#docs/"+s.get("class_name"),!1)}})}.call(this);