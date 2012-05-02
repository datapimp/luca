Luca.components.DevelopmentConsole = Luca.View.extend
  name: "development_console"

  initialize: (@options={})->
    Luca.View::initialize.apply @, arguments

  beforeRender: ()->
    @$el.append @make("div",class:"luca-ui-development-console")

    @console_el = @$('.luca-ui-development-console')

    console.log "Turning into console", @console_el, @$el

    @console = @console_el.console
      promptLabel: "Coffee> "
      animateScroll: true
      promptHistory: true
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

      commandHandle: (line)->
        line = _( line ).strip()
        line = "return #{ line }" unless line.match(/^return/)

        compiled = CoffeeScript.compile(line)
        try
          ret = eval(compiled)
          val = if ret? then JSON.stringify( ret ) else true
          return val
        catch error
          if error.message.match /circular structure to JSON/
            return ret.toString()

          error.toString()





 #          var controller2 = console2.console({
 #          promptLabel: 'JavaScript> ',
 #          commandValidate:function(line){
 #            if (line == "") return false;
 #            else return true;
 #          },
 #          commandHandle:function(line){
 #              try { var ret = eval(line);
 #                    if (typeof ret != 'undefined') return ret.toString();
 #                    else return true; }
 #              catch (e) { return e.toString(); }
 #          },
 #          animateScroll:true,
 #          promptHistory:true,
 #          welcomeMessage:'Enter some JavaScript expressions to evaluate.'
 #        });
 #        controller2.promptText('5 * 4');