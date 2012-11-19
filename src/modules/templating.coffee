Luca.modules.Templating =
  __initializer: ()->
    templateVars = Luca.util.read.call(@, @bodyTemplateVars) || {}

    if template = @bodyTemplate
      @$el.empty()
      templateContent = Luca.template(template, templateVars)      
      Luca.View::$html.call(@, templateContent)
