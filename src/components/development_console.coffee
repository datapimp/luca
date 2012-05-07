Luca.components.DevelopmentConsole = Luca.View.extend
  name: "development_console"
  className: 'luca-ui-development-console'

  initialize: (@options={})->
    Luca.View::initialize.apply @, arguments
    if @modal
      @$el.addClass 'luca-ui-modal'

  beforeRender: ()->
    @$el.append @make("div",class:"console-inner")

    @console_el = @$('.console-inner')

    @console = @console_el.console
      promptLabel: "Coffee> "
      animateScroll: true
      promptHistory: true
      autoFocus: true
      commandValidate: (line)->
        valid = true

        valid = false if line is ""

        try
          if CoffeeScript.compile(line)
            valid = true
          else
            valid = false
        catch error
          valid =  false

        valid

      returnValue: (val)->
        return "undefined" unless val?
        val?.toString()

      parseLine: (line)->
        _( line ).strip()
        line = line.replace(/^return/,' ')
        "return #{ line }"

      commandHandle: (line)->
        return if line is ""

        compiled = CoffeeScript.compile( @parseLine(line) )

        try
          ret = eval(compiled)
          return @returnValue(ret)
        catch error
          if error.message.match /circular structure to JSON/
            return ret.toString()

          error.toString()
