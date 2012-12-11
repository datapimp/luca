Luca.concerns.Templating =
  __initializer: ()->
    templateVars = Luca.util.read.call(@, @bodyTemplateVars) || {}

    if template = @bodyTemplate
      @$el.empty()
      try
        templateContent = Luca.template(template, templateVars)      
      catch e
        console.log "Error Rendering #{ bodyTemplate} in View: #{ @identifier?() || @name || @cid }"
      Luca.View::$html.call(@, templateContent)
