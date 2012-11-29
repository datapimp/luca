Luca.concerns.DomHelpers = 
  __initializer: ()->
    additionalClasses = _( @additionalClassNames || [] ).clone()

    @$wrap( @wrapperClass ) if @wrapperClass?

    if _.isString additionalClasses
      additionalClasses = additionalClasses.split(" ")

    if @gridSpan
      additionalClasses.push "span#{ @gridSpan }"

    if @gridOffset
      additionalClasses.push "offset#{ @gridOffset }"

    if @gridRowFluid
      additionalClasses.push "row-fluid"

    if @gridRow
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
    @$el.html( Luca.template(template,variables) )

  $html: (content)->
    @$el.html( content )

  $append: (content)->
    @$el.append( content )

  $attach: ()->
    @$container().append( @el )

  $bodyEl: ()->
    @$el
    
  $container: ()->
    $(@container)  