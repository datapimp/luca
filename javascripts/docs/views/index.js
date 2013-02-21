(function(){var e;e=Docs.register("Docs.components.ApiBrowser"),e["extends"]("Luca.Container"),e.configuration({componentEvents:{"* button:click":"loadUrl"}}),e.contains({type:"container",rowFluid:!0,className:"url-selector",components:[{type:"text_field",name:"endpoint_url",label:"Enter a URL",span:9},{type:"button_field",input_value:"Browse",span:3}]},{tagName:"pre",className:"prettyprint pre-scrollable",role:"output",afterInitialize:function(){return this.$el.html("Loading...")}}),e.privateMethods({runExample:function(){return console.log("Running example"),this.findComponentByName("endpoint_url",!0).setValue("https://api.github.com/users/datapimp/gists"),this.loadUrl()},loadUrl:function(){var e,t=this;return e=this.findComponentByName("endpoint_url",!0).getValue(),$.get(e,function(e,n,r){return t.getOutput().$html(r.responseText),window.prettyPrint()})}}),e.register()}).call(this),function(){var e;e=Docs.register("Docs.views.ComponentDocumentation"),e["extends"]("Luca.View"),e.privateConfiguration({bodyTemplate:"component_documentation",displaySource:!1,displayHeader:!1}),e.publicMethods({loadComponent:function(e){var t,n,r,i;this.component=e,this.reset(),i=["private","public"];for(n=0,r=i.length;n<r;n++)t=i[n],this.renderMethodGroup(t),this.renderPropertyGroup(t);return this.$(".source").hide(),this.displayHeader===!0&&(this.$(".header-documentation").show(),this.$(".header-documentation").html(this.component.get("header_documentation"))),this.displaySource===!0&&(this.$(".source").show(),this.$("pre.source").html(this.component.contentsWithoutHeader())),this.$("pre").addClass("prettyprint")}}),e.privateMethods({reset:function(){return this.$(".table tbody").empty(),this.$(".properties,.methods").hide(),this.$(".header-documentation").hide()},renderMethodGroup:function(e){var t,n,r,i,s,o,u,a,f,l;e==null&&(e="public"),o=(u=this.component)!=null?(a=u.documentation())!=null?a.details[""+e+"Methods"]:void 0:void 0;if(_.isEmpty(o))return;s=(f=Luca.util.resolve(this.component.get("class_name")))!=null?f.prototype:void 0,r=this.$(".methods."+e).show().find(".table tbody"),l=[];for(i in o){n=o[i];if(!_.isFunction(s[i]))continue;n||(n={}),t=_(n.arguments).reduce(function(e,t){return e+=""+t.argument,t.value!=null&&(e+="= "+(t.value||"undefined")),e+="<br/>"},""),l.push(r.append("<tr><td>"+i+"</td><td>"+t+"</td><td>"+(n.documentation||"")+"</td></tr>"))}return l},renderPropertyGroup:function(e){var t,n,r,i,s,o,u,a,f;e==null&&(e="public"),s=(o=this.component)!=null?(u=o.documentation())!=null?u.details[""+e+"Properties"]:void 0:void 0;if(_.isEmpty(s))return;i=(a=Luca.util.resolve(this.component.get("class_name")))!=null?a.prototype:void 0,n=this.$(".properties."+e).show().find(".table tbody"),f=[];for(r in s){t=s[r];if(!!_.isFunction(i[r]))continue;t||(t={}),f.push(n.append("<tr><td>"+r+"</td><td>"+(t["default"]||"")+"</td><td>"+(t.documentation||"")+"</td></tr>"))}return f}}),e.register()}.call(this),function(){var e;e=Docs.register("Docs.components.GistEditor"),e["extends"]("Luca.Container"),e.contains({role:"browser"}),e.register()}.call(this),function(){var e;e=Docs.register("Docs.views.BasicFormView"),e["extends"]("Luca.components.FormView"),e.privateConfiguration({defaults:{type:"text"}}),e.publicConfiguration({components:[{label:"Text Field One"},{type:"select",label:"Select Field One",collection:{data:[["Alpha","Alpha"],["Bravo","Bravo"],["Charlie","Charlie"],["Delta","Delta"]]}},{type:"checkbox_field",label:"Checkbox Field"}]}),e.register()}.call(this),function(){var e;e=Docs.register("Docs.views.ComplexLayoutForm"),e["extends"]("Luca.components.FormView"),e.privateConfiguration({rowFluid:!0,componentEvents:{"group_selector on:change":"selectGroup"}}),e.privateMethods({selectGroup:function(){var e,t;return e=this.getGroupSelector().getValue(),t=this.getGroupDisplaySelector(),t.activate(e)}}),e.contains({type:"container",span:6,components:[{type:"text",label:"Field One"},{type:"text",label:"Field Two"},{type:"text",label:"Field Three"}]},{type:"container",span:6,components:[{label:"Select a Group",type:"select",role:"group_selector",includeBlank:!1,valueType:"string",collection:{data:[["alpha","Alpha Group"],["bravo","Bravo Group"],["charlie","Charlie Group"]]}},{type:"card",role:"group_display_selector",components:[{name:"alpha",defaults:{type:"text"},components:[{type:"view",tagName:"h4",bodyTemplate:function(){return"Group One"}},{label:"Alpha"},{label:"Bravo"},{label:"Charlie"}]},{name:"bravo",defaults:{type:"checkbox_field"},components:[{type:"view",tagName:"h4",bodyTemplate:function(){return"Group Two"}},{label:"One"},{label:"Two"}]},{name:"charlie",defaults:{type:"button_field"},components:[{type:"view",tagName:"h4",bodyTemplate:function(){return"Group Three"}},{input_value:"Button One",icon_class:"chevron-up"},{input_value:"Button Two",icon_class:"pencil"}]}]}]})}.call(this),function(){var e;e=Docs.register("Docs.views.TopNavigation"),e["extends"]("Luca.components.NavBar"),e.defines({brand:"Luca.js",inverse:!0,orientation:"top"})}.call(this),function(){var e;e=Docs.register("Docs.views.ComponentDetails"),e["extends"]("Luca.Container"),e.configuration({rowFluid:!0}),e.contains({role:"documentation",span:5,loadComponent:function(e){return this.$el.empty(),this.$el.append("<h2>"+e.get("class_name")+"</h2>"),this.$el.append("<div class='header-documentation'>"+e.get("header_documentation")+"</div>")}},{type:"component_documentation",role:"details",displaySource:!0,span:7}),e.defines({afterRender:function(){return this.getDetails().$el.hide(),this.getDocumentation().$el.hide()},load:function(e){return this.getDetails().$el.show(),this.getDocumentation().$el.show(),this.getDetails().loadComponent(e),this.getDocumentation().loadComponent(e),this.prettyPrint()},prettyPrint:function(){return this.$("pre").addClass("prettyprint"),typeof window.prettyPrint=="function"?window.prettyPrint():void 0}})}.call(this),function(){var e;e=Docs.register("Docs.views.ComponentList"),e["extends"]("Luca.components.ScrollableTable"),e.defines({paginatable:!1,maxHeight:200,collection:"luca_documentation",columns:[{reader:"class_name",width:"20%",renderer:function(e){return"<a class='link'>"+e+"</a>"}},{reader:"class_name",header:"Extends From",width:"20%",renderer:function(e){var t,n,r;if(t=Luca.util.resolve(e))return n=(r=t.prototype.componentMetaData())!=null?r.meta["super class name"]:void 0,"<a class='link'>"+n+"</a>"}},{reader:"type_alias",header:"Shortcut",width:"10%"},{reader:"defined_in_file",header:"<i class='icon icon-github'/> Github",renderer:function(e){var t;return t=e.split("javascripts/luca/")[1],"<a href='https://github.com/datapimp/luca/blob/master/app/assets/javascripts/luca/"+t+"'>"+t+"</a>"}}]})}.call(this),function(){var e;e=Docs.register("Docs.views.BrowseSource"),e["extends"]("Luca.Container"),e.configuration({autoBindEventHandlers:!0,events:{"click .docs-component-list a.link":"selectComponent"}}),e.contains({component:"component_list"},{component:"component_details"}),e.privateMethods({index:function(){return this.selectComponent(this.getComponentList().getCollection().at(0))},show:function(e){var t;return t=this.getComponentList().getCollection().detect(function(t){return t.get("class_name")===e}),t==null?this.index():this.selectComponent(t)},selectComponent:function(e){var t,n,r,i,s,o;return i=this.getComponentList(),n=this.getComponentDetails(),Luca.isBackboneModel(e)?(s=e,r=i.getCollection().indexOf(s),o=i.$("tr[data-index='"+r+"']")):(t=this.$(e.target),o=t.parents("tr").eq(0),r=o.data("index"),s=i.getCollection().at(r)),i.$("tr").removeClass("info"),o.addClass("info"),n.load(s)}})}.call(this),function(){var e;e=Docs.register("Docs.views.ExampleDocs"),e["extends"]("Docs.views.ComponentDocumentation"),e.defines({collection:"docs_documentation",displayHeader:!0,beforeRender:function(){var e,t=this;e=this.collection.detect(function(e){return e.get("type_alias")===t.example});if(e!=null)return this.loadComponent(e)}})}.call(this),function(){var e;e=Docs.register("Docs.views.ExampleSource"),e["extends"]("Luca.View"),e.defines({tagName:"pre",className:"prettyprint pre-scrollable",collection:"docs_documentation",beforeRender:function(){var e,t=this;return e=this.collection.detect(function(e){return e.get("type_alias")===t.example}),this.$el.html(e.get("source_file_contents")),window.prettyPrint()}})}.call(this),function(){var e;e=Docs.register("Docs.views.ExamplesBrowser"),e["extends"]("Luca.containers.TabView"),e.contains({title:"API Browser",type:"api_browser",name:"api_browser"},{title:"Basic FormView",type:"basic_form_view",name:"basic_form_view"},{title:"Complex Layout FormView",type:"complex_layout_form",name:"complex_layout_form"}),e.privateConfiguration({activeCard:0,tab_position:"left"}),e.privateMethods({wrapExampleComponents:function(){var e;return e=[],e=_(this.components).map(function(e,t){return{title:e.title,name:e.name,components:[{type:"card",role:"view_selector",afterInitialize:function(){return this.$el.append("<h3>"+e.title+" Example</h3>")},components:[{type:e.type,name:"component",activation:function(){return typeof this.runExample=="function"?this.runExample():void 0}},{type:"example_source",example:e.name,name:"source"},{type:"example_docs",example:e.name,name:"documentation"}]},{bodyTemplate:"examples_browser/selector",bodyTemplateVars:function(){return{example_name:e.name}}}]}}),this.components=e,this.components.unshift({title:"Overview",bodyTemplate:"examples_browser/overview"})},afterInitialize:function(){return this.wrapExampleComponents()}}),e.publicMethods({show:function(e,t){return e==null&&(e=0),t==null&&(t="component"),this.activate(e,!1,function(){return this.getViewSelector().activate(t),this.$("li").removeClass("active"),this.$("li."+t).addClass("active")})},index:function(){return this.show()}}),e.register()}.call(this),function(){var e;e=Docs.register("Docs.views.Home"),e["extends"]("Luca.components.Page"),e.configuration({template:"pages/home"}),e.defines({index:function(){return this.trigger("index")}}),e.register()}.call(this),function(){}.call(this);