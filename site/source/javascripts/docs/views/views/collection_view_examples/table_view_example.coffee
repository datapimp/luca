view = Docs.register      "Docs.views.TableViewExample"
view.extends              "Luca.components.ScrollableTable"
view.publicConfiguration
  # Only render 100 models at a time.  The `Luca.CollectionView` has
  # automatic pagination control rendering, if you specify a pagination
  # view class and render area. 
  paginatable: 100
  
  # The scrollable table element has a max height. 
  maxHeight: 300

  # The string "github_repositories" is an alias for the collection manager
  # which is created by the `Docs.Application`.  It represents a singular
  # global instance of the `Docs.collections.GithubRepositories` collection. 
  collection: "github_repositories"

  # The `Luca.components.TableView` component accepts an array of column
  # configurations.  Each column can specify the following properties:
  # - header
  # - reader ( a method, or attribute on the collection's model )
  # - renderer ( a custom function which renders the model / reader )
  # - width ( a percentage width for the column )
  columns:[
    reader: "name"
    renderer: (name, model)->
      "<a href=#{ model.get('html_url') }>#{ name }</a>"
  ,  
    reader: "description"
  ,
    reader: "language"
  ,
    reader: "watchers"
  ]

view.publicMethods
  runExample: ()->
    @getCollection().fetch()

view.register()