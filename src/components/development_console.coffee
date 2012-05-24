Luca.components.DevelopmentConsole = Luca.View.extend
  name: "development_console"
  className: 'luca-ui-development-console'

  initialize: (@options={})->
    Luca.View::initialize.apply @, arguments
    if @modal
      @$el.addClass 'luca-ui-modal'

  events:
    "keypress *" : (e)->
      console.log "Keypress", e

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

      parseLine: (line)->
        line = _.string.strip(line)
        line = line.replace(/^return/,' ')
        line = @detectUnderscoreCommand(line)
        line = @handleMultiLine(line)

        "return(1)"

      returnValue: (val)->
        return "undefined" unless val?

        if _.isFunction(val) or _.isString(val) or _.isNumber(val)
          return val.toString()

        if _.isArray(val) or _.isObject(val)
          return JSON.stringify(val)

        return val.toString() || ""


      handleMultiLine: (line)->
        line

      detectUnderscoreCommand: (line)->
        if line.match /^cd\s+/
          context = line.replace(/cd\s+/,'')
          @context = eval( context )
          line = "'setting context to #{ context }'"

        if line.match /^k\s+/
          line = line.replace(/^k\s+/,'_.keys ')

        if line.match /^v\s+/
          line = line.replace(/^v\s+/,'_.values ')

        if line.match /^f\s+/
          line = line.replace(/^f\s+/,'_.functions ')

        line

      clear: ()->
        @console.reset()

      commandHandle: (line)->
        return if line is ""

        @context ||= @

        parsed = @parseLine(line)

        code = ()->
          compiled = CoffeeScript.compile( parsed, bare: true )
          eval(compiled)

        try
          clear = @clear
          returnValue = code.call(@context)
        catch error
          console.log "Error", error.message

          if error.message.match /circular structure to JSON/
            return ret.toString()

          error.toString()
