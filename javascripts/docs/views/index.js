(function(){var e;e=Docs.register("Docs.components.ApiBrowser"),e["extends"]("Luca.Container"),e.configuration({componentEvents:{"* button:click":"loadUrl"}}),e.contains({type:"container",rowFluid:!0,className:"url-selector",components:[{type:"text_field",name:"endpoint_url",label:"Enter a URL",span:9},{type:"button_field",input_value:"Browse",span:3}]},{tagName:"pre",className:"prettyprint pre-scrollable",role:"output"}),e.privateMethods({runExample:function(){return this.findComponentByName("endpoint_url",!0).setValue("https://api.github.com/users/datapimp/gists"),this.loadUrl()},loadUrl:function(){var e,t=this;return e=this.findComponentByName("endpoint_url",!0).getValue(),$.get(e,function(e,n,r){return t.getOutput().$html(r.responseText),window.prettyPrint()})}}),e.register()}).call(this),function(){var e;e=Docs.register("Docs.components.GistEditor"),e["extends"]("Luca.Container"),e.contains({role:"browser"}),e.register()}.call(this),function(){var e;e=Docs.register("Docs.views.TopNavigation"),e["extends"]("Luca.components.NavBar"),e.defines({brand:"Luca.js",inverse:!0,orientation:"top"})}.call(this),function(){var e;e=Docs.register("Docs.views.ComponentDetails"),e["extends"]("Luca.Container"),e.configuration({rowFluid:!0}),e.contains({role:"documentation",span:5},{role:"source",type:"panel",bodyTemplate:"component_documentation",span:7}),e.defines({afterRender:function(){return this.getSource().$el.hide()},load:function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p;a=this.getSource(),r=this.getDocumentation(),u=((f=Luca.util.resolve(e.get("class_name")))!=null?f.prototype:void 0)||{},a.$(".table tbody").empty(),r.$el.show().empty(),r.$el.append("<h2>"+e.get("class_name")+"</h2>"),r.$el.append("<div class='header-documentation'>"+e.get("header_documentation")+"</div>"),a.$el.show(),a.$(".methods, .properties").hide(),i=e.documentation().details;if(!_.isEmpty(i!=null?i.publicProperties:void 0)){s=a.$(".public.properties").show().find(".table tbody"),l=i.publicProperties;for(o in l){n=l[o];if(!!_.isFunction(u[o]))continue;n||(n={}),s.append("<tr><td>"+o+"</td><td>"+(n["default"]||"")+"</td><td>"+(n.documentation||"")+"</td></tr>")}}if(!_.isEmpty(i!=null?i.privateProperties:void 0)){s=a.$(".private.properties").show().find(".table tbody"),c=i.privateProperties;for(o in c){n=c[o];if(!!_.isFunction(u[o]))continue;n||(n={}),s.append("<tr><td>"+o+"</td><td>"+(n["default"]||"")+"</td><td>"+(n.documentation||"")+"</td></tr>")}}if(!_.isEmpty(i!=null?i.publicMethods:void 0)){s=a.$(".public.methods").show().find(".table tbody"),h=i.publicMethods;for(o in h){n=h[o];if(!_.isFunction(u[o]))continue;n||(n={}),t=_(n.arguments).reduce(function(e,t){return e+=""+t.argument,t.value!=null&&(e+="= "+(t.value||"undefined")),e+="<br/>"},""),s.append("<tr><td>"+o+"</td><td>"+t+"</td><td>"+(n.documentation||"")+"</td></tr>")}}if(!_.isEmpty(i!=null?i.privateMethods:void 0)){s=a.$(".private.methods").show().find(".table tbody"),p=i.privateMethods;for(o in p){n=p[o];if(!_.isFunction(u[o]))continue;n||(n={}),t=_(n.arguments).reduce(function(e,t){return e+=""+t.argument,t.value!=null&&(e+="= "+(t.value||"undefined")),e+="<br/>"},""),s.append("<tr><td>"+o+"</td><td>"+t+"</td><td>"+(n.documentation||"")+"</td></tr>")}}return a.$("pre.source").html(e.contentsWithoutHeader()),this.prettyPrint()},prettyPrint:function(){return this.$("pre").addClass("prettyprint"),typeof window.prettyPrint=="function"?window.prettyPrint():void 0}})}.call(this),function(){var e;e=Docs.register("Docs.views.ComponentList"),e["extends"]("Luca.components.ScrollableTable"),e.defines({paginatable:!1,maxHeight:200,collection:"framework_documentation",columns:[{reader:"class_name",width:"20%",renderer:function(e){return"<a class='link'>"+e+"</a>"}},{reader:"class_name",header:"Extends From",width:"20%",renderer:function(e){var t,n,r;if(t=Luca.util.resolve(e))return n=(r=t.prototype.componentMetaData())!=null?r.meta["super class name"]:void 0,"<a class='link'>"+n+"</a>"}},{reader:"type_alias",header:"Shortcut",width:"10%"},{reader:"defined_in_file",header:"<i class='icon icon-github'/> Github",renderer:function(e){var t;return t=e.split("javascripts/luca/")[1],"<a href='https://github.com/datapimp/luca/blob/master/app/assets/javascripts/luca/"+t+"'>"+t+"</a>"}}]})}.call(this),function(){var e;e=Docs.register("Docs.views.BrowseSource"),e["extends"]("Luca.Container"),e.configuration({autoBindEventHandlers:!0,events:{"click .docs-component-list a.link":"selectComponent"}}),e.contains({component:"component_list"},{component:"component_details"}),e.privateMethods({index:function(){return this.selectComponent(this.getComponentList().getCollection().at(0))},show:function(e){var t;return t=this.getComponentList().getCollection().detect(function(t){return t.get("class_name")===e}),t==null?this.index():this.selectComponent(t)},selectComponent:function(e){var t,n,r,i,s,o;return i=this.getComponentList(),n=this.getComponentDetails(),Luca.isBackboneModel(e)?(s=e,r=i.getCollection().indexOf(s),o=i.$("tr[data-index='"+r+"']")):(t=this.$(e.target),o=t.parents("tr").eq(0),r=o.data("index"),s=i.getCollection().at(r)),i.$("tr").removeClass("info"),o.addClass("info"),n.load(s)}})}.call(this),function(){var e;e=Docs.register("Docs.views.ExampleDocs"),e["extends"]("Luca.View"),e.register()}.call(this),function(){var e;e=Docs.register("Docs.views.ExampleSource"),e["extends"]("Luca.View"),e.register()}.call(this),function(){var e;e=Docs.register("Docs.views.ExamplesBrowser"),e["extends"]("Luca.containers.TabView"),e.contains({title:"API Browser",type:"api_browser",name:"api_browser"}),e.privateConfiguration({activeCard:0,tab_position:"left"}),e.privateMethods({wrapExampleComponents:function(){var e,t,n;return n=function(){var n,r,i,s;i=this.components,s=[];for(t=n=0,r=i.length;n<r;t=++n)e=i[t],s.push({title:e.title,name:e.name,components:[{type:"card",role:"view_selector",afterInitialize:function(){return this.$el.append("<h3>"+e.title+" Example</h3>")},components:[{type:e.type,name:"component"},{type:"example_source",example:e.name,name:"source"},{type:"example_docs",example:e.name,name:"documentation"}]},{bodyTemplate:"examples_browser/selector",bodyTemplateVars:function(){return{example_name:e.name}}}]});return s}.call(this),this.components=n,this.components.unshift({title:"Overview",bodyTemplate:"examples_browser/overview"})},afterInitialize:function(){return this.wrapExampleComponents()}}),e.publicMethods({show:function(e,t){return e==null&&(e=0),t==null&&(t="component"),this.activate(e,!1,function(){return console.log("Activation callback",this,e,t),this.getViewSelector().activate(t),this.$("li").removeClass("active"),this.$("li."+t).addClass("active")})},index:function(){return this.show()}}),e.register()}.call(this),function(){var e;e=Docs.register("Docs.views.Home"),e["extends"]("Luca.components.Page"),e.configuration({template:"pages/home"}),e.defines({index:function(){return this.trigger("index")}}),e.register()}.call(this),function(){}.call(this);