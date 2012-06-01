_.def("Luca.Router").extends("Backbone.Router").with
  routes:
    "" : "default"

  initialize: (@options)->
    _.extend @, @options

    @routeHandlers = _( @routes ).values()

    # when a route handler is fired, the route:route_name event is triggered by the router
    # unfortunately this doesn't apply to calls to @navigate() so we override Backbone.Router.navigate
    # and trigger an event separately.
    _( @routeHandlers ).each (route_id) =>
      @bind "route:#{ route_id }", ()=>
        @trigger.apply @, ["change:navigation", route_id  ].concat( _( arguments ).flatten() )

  #### Router Functions

  # Intercept calls to Backbone.Router.navigate so that we can at least
  # build a path from the route, even if we don't trigger the route handler
  navigate: (route, triggerRoute=false)->
    Backbone.Router.prototype.navigate.apply @, arguments
    @buildPathFrom( Backbone.history.getFragment() )

  # given a url fragment, construct an argument chain similar to what would be
  # emitted from a normal route:#{ name } event that gets triggered
  # when a route is actually fired.  This is used to trap route changes that happen
  # through calls to @navigate()
  buildPathFrom: (matchedRoute)->
    _(@routes).each (route_id, route)=>
      regex = @_routeToRegExp(route)
      if regex.test(matchedRoute)
        args = @_extractParameters(regex, matchedRoute)
        @trigger "change:navigation", [route_id].concat( args )
