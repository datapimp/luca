Luca.modules.DomHelpers = 
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

  $wrap: (wrapper)->
    if _.isString(wrapper) and not wrapper.match(/[<>]/)
      wrapper = @make("div",class:wrapper)

    @$el.wrap( wrapper )

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