# Luca.Application

A large single-page app generally needs some sort of globally available state tracking object, something which acts as a single entry point into the application.    

Luca.Application is a type of Viewport class which handles things such as:

- collection manager ( manages your collections for you ) 
- socket manager ( relays websocket events as Backbone.Events )
- page controller ( displays a unique page of the application) 
- url fragment router (`Backbone.Router`)
- global attributes

The Luca.Application stores its state in a `Backbone.Model`, which means you can 