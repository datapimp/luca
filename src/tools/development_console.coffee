inspectArray = (array)->
  lastPrompt = @$('.console-inner .jquery-console-prompt-label').last()

  items = _( array ).map (item)-> "<span>#{ item?.toString() || "undefined" }</span>"

  lastPrompt.before("<div class='array-inspector'>#{ items.join('') }</div>")


_.def('Luca.components.DevelopmentConsole').extends('Luca.View').with

  name: "development_console"

  className: 'luca-ui-development-console'

  prompt:"Coffee> "

  initialize: (@options={})->
    Luca.View::initialize.apply @, arguments

    console_name = @name

    if @modal
      @$el.addClass 'luca-ui-modal'

  beforeRender: ()->
    @$el.append @make("div",class:"console-inner")

    @console_el = @$('.console-inner')

    console_name = @name
    devConsole = @

    @console = @console_el.console
      promptLabel: @prompt
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

        if _.isArray(val)
          inspectArray(val)
          return ""

        val?.toString() || ""

      parseLine: (line)->
        line = _.string.strip(line)
        line = line.replace(/^return/,' ')

        if line is "clear"
          Luca.cache( console_name ).console.reset()
          return "return ''"

        "return #{ line }"

      commandHandle: (line)->
        return if line is ""

        compiled = CoffeeScript.compile( @parseLine(line) )

        keys = _.keys
        values = _.values
        functions = _.functions
        inspect = JSON.stringify
        inspectArray = _.bind(inspectArray, devConsole)

        try
          ret = eval(compiled)
          return @returnValue(ret)
        catch error
          if error?.message?.match /circular structure to JSON/
            return ret.toString()

          error.toString()