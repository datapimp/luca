(function(){var e;e=Docs.register("Docs.components.ApiBrowser"),e["extends"]("Luca.Container"),e.configuration({componentEvents:{"* button:click":"loadUrl"}}),e.contains({type:"container",rowFluid:!0,className:"url-selector",components:[{type:"text_field",name:"endpoint_url",label:"Enter a URL",span:9},{type:"button_field",input_value:"Browse",span:3}]},{tagName:"pre",className:"prettyprint pre-scrollable",role:"output",afterInitialize:function(){return this.$el.html("Loading...")}}),e.privateMethods({runExample:function(){return this.findComponentByName("endpoint_url",!0).setValue("https://api.github.com/users/datapimp/gists"),this.loadUrl()},loadUrl:function(){var e,t=this;return e=this.findComponentByName("endpoint_url",!0).getValue(),$.get(e,function(e,n,r){return t.getOutput().$html(r.responseText),window.prettyPrint()})}}),e.register()}).call(this);