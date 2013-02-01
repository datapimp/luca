## Component Driven Design

The Luca framework is designed to encourage Component Driven Design for your single page application.  In the simplest instance, components can be single purpose elements composed of a View, an optional Template, and CSS.  Or, as your application grows in complexity, your components will grow to encapsulate multiple smaller components.

Good component design dictates that each component should only care about itself and not be aware of anything outside of it.  A good component provides a public API for working with everything inside of it.

Luca provides a special type of View called 'Luca.Container` which is designed to faciliate the communication between multiple components.


### Component Definition Registry

The component definition style employed by Luca makes it easy to manage a registry of components in your application.  It provides more granular methods for definining the properties and methods on your component prototype.  In the end, everything
gets put together and the component is defined just as you would define a standard Backbone component.

In Luca, you can call Luca.View.extend just as you would Backbone.View.extend.  But doing so will bypass the component registry
and a lot of the helpers in the framework that are designed to help you manage the complexity of your application as it grows.

#### Step One: Defining a simple list component
```
list = App.register 		"App.views.BooksList"
list.extends 				"Luca.CollectionView"

list.defines
  autoBindEventHandlers: true
  events:
    "click .book" : "selectBook"
    
  collection: "books"
  itemTemplate: "book_listing"
  itemClassName: "book"
  
  selectBook: (e)->
    $element 	= $(e.target)
    bookId   	= $element.data('model-id')
    bookModel 	= @collection.get(bookId)
    
    @trigger "book:selected", bookModel, e
     
```

#### Step Two: Defining a details view

Below we will define another component.  The syntax below is optional, and is essentially the same as above, however we will take advantage of the more granular options available to us for the purpose of making our definition more readable.  Here we are explicit about our intent for the method `@renderBookDetails` by specifying it as public, any component which makes use of this knows that it will interact with the public interface.

In addition to providing more readable code, these methods are used to automatically generate nice documentation for your components.

```
details = App.register 		"App.views.BookDetails"

details.extends 			"Luca.View"


details.publicMethods
  renderBookDetails: (bookModel)->
    @$el.html( Luca.template("book_details", bookModel))


details.register() # the call to register is the same as defines() but is more readable on its own.
```

#### Step Three: Putting the components together 

Now that we have defined two components, they can be used on their own or as members of a larger composite view.

In the below example, we create a `Luca.Container` which contains the two components we defined above and facilitates
communication between them by listening to the events they emit and passing them to interested parties.

```
browser = App.register 	"App.views.BooksBrowser"

browser.extends 			"Luca.Container"

component.defines
  # This component will be unique, there will only ever be one instance of it.
  # Other parts of our application will be able to access it by `App("books_browser")`
  name: "books_browser"
  
  # Will be rendered with the `row-fluid` class on it. Enabling our subcomponents
  # to add their own `span6` classes to position themselves in a bootstrap style grid.
  rowFluid: true
  
  # faciliate the communication between our subcomponents by listening to the events
  # they emit and routing them to interested parties.
  componentEvents:
    "list book:selected" : "viewBookDetails"
     
  components:
    role: "list"
	type: "books_list"
	span: 3
  ,
    role: "details"
    type: "book_details"
    span: 9
	
 # This method will get called in response to the componentEvent binding that we declared.
 # It will take the message and pass it to the component with the role `details`
 viewBookDetails: (bookModel)->
   @getDetails().renderBookDetails(bookModel)
```

#### A Note on the @type alias:

Whenever you register a component using the style above, type aliases will be created for you.  `BookDetails` will be `book_details`, `BooksBrowser` will be `books_browser` and so on.  This allows you to compose containers by specifying a JSON object with strings, as opposed to manually instantiating the object yourself and having to type out the full name of the component every time. 

#### Using your components

The components we defined can be used in isolation, or as parts of other components. 

We could simply render the BooksBrowser into the DOM directly:

```
  browser = new App.views.BooksBrowser()
  $('body').html( browser.render().el )
```

Or include it in a page of our application:

```
  MyApp = new App.Application
    routes:
      "" : "books_browser"
      "books/:title" : "books_browser#loadBook"
    
    collectionManager:
      initialCollections:[
        "books"
      ]
    
    getCollection: (collectionName)->
      @collectionManager.getOrCreate(collectionName)
      
  	components:[
  	  name: "books_browser"
  	  type: "books_browser"
  	  loadBook: (title)->
  	    bookModel = App().getCollection("books").findByTitle(title)
  	    @viewBookDetails(bookModel)
  	]
```