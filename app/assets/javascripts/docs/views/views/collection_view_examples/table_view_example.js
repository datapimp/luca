(function(){var e;e=Docs.register("Docs.views.TableViewExample"),e["extends"]("Luca.components.ScrollableTable"),e.publicConfiguration({paginatable:100,maxHeight:300,collection:"github_repositories",columns:[{reader:"name",renderer:function(e,t){return"<a href="+t.get("html_url")+">"+e+"</a>"}},{reader:"description"},{reader:"language"},{reader:"watchers"}]}),e.publicMethods({runExample:function(){return this.getCollection().fetch()}}),e.register()}).call(this);