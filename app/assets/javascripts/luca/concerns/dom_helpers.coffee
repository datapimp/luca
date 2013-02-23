Luca.concerns.DomHelpers = 
  __initializer: ()->
    additionalClasses = _( @additionalClassNames || [] ).clone()

    @$wrap( @wrapperClass ) if @wrapperClass?

    if _.isString additionalClasses
      additionalClasses = additionalClasses.split(" ")

    if span = @gridSpan || @span
      additionalClasses.push "span#{ span }"

    if offset = @gridOffset || @offset
      additionalClasses.push "offset#{ offset }"

    if @gridRowFluid || @rowFluid
      additionalClasses.push "row-fluid"

    if @gridRow || @row
      additionalClasses.push "row"

    return unless additionalClasses?

    for additional in additionalClasses
      @$el.addClass( additional )     

    if Luca.config.autoApplyClassHierarchyAsCssClasses is true
      classes = @componentMetaData?()?.styleHierarchy() || []

      for cssClass in classes when (cssClass isnt "luca-view" and cssClass isnt "backbone-view")
        @$el.addClass(cssClass)

  $wrap: (wrapper)->
    if _.isString(wrapper) and not wrapper.match(/[<>]/)
      wrapper = @make("div",class:wrapper,"data-wrapper":true)

    @$el.wrap( wrapper )

  $wrapper: ()->
    @$el.parent('[data-wrapper="true"]')  

  $template: (template, variables={})->
    try 
      @$el.html( Luca.template(template,variables) )
    catch e
      console.log "Error in $template: #{ template } #{ @identifier?() ? @name || @cid }"

  $html: (content)->
    if content? then @$el.html(content) else @$el.html()

  $append: (content)->
    @$el.append(content)

  $attach: ()->
    @$container().append( @el )

  $bodyEl: ()->
    @$el
    
  $container: ()->
    $(@container)  