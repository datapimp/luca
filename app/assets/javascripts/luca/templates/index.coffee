#= require_tree ./luca
#= require_self

# This is a convenience method for accessing the templates
# available to the client side app, either the ones which ship with Luca
# available in Luca.templates ( these take precedence ) or
# the app's own templates which are usually available in JST

# optionally, passing in variables will compile the template for you, instead
# of returning a reference to the function which you would then call yourself
Luca.template = (template_name, variables)->
  window.JST ||= {}

  if _.isFunction(template_name)
    return template_name(variables)

  luca = Luca.templates?[ template_name ]
  jst = JST?[ template_name ]

  unless luca? or jst?
    needle = new RegExp("#{ template_name }$")

    luca = _( Luca.templates ).detect (fn,template_id)->
      needle.exec( template_id )

    jst = _( JST ).detect (fn,template_id)->
      needle.exec( template_id )

  throw "Could not find template named #{ template_name }" unless luca || jst

  template = luca || jst

  return template(variables) if variables?

  template

Luca.available_templates = (filter="")->
  available = _( Luca.templates ).keys()

  if filter.length > 0
    _( available ).select (tmpl)-> tmpl.match(filter)
  else
    available
