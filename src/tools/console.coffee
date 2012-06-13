codeMirrorOptions =
  readOnly: true
  autoFocus: false
  theme: "monokai"
  mode: "javascript"

source_formatter = (html_source, options) ->
  Parser = ->
    @pos = 0
    @token = ""
    @current_mode = "CONTENT"
    @tags =
      parent: "parent1"
      parentcount: 1
      parent1: ""

    @tag_type = ""
    @token_text = @last_token = @last_text = @token_type = ""
    @Utils =
      whitespace: "\n\r\t ".split("")
      single_token: "br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed".split(",")
      extra_liners: "head,body,/html".split(",")
      in_array: (what, arr) ->
        i = 0

        while i < arr.length
          return true  if what is arr[i]
          i++
        false

    @get_content = ->
      input_char = ""
      content = []
      space = false
      while @input.charAt(@pos) isnt "<"
        return (if content.length then content.join("") else [ "", "TK_EOF" ])  if @pos >= @input.length
        input_char = @input.charAt(@pos)
        @pos++
        @line_char_count++
        if @Utils.in_array(input_char, @Utils.whitespace)
          space = true  if content.length
          @line_char_count--
          continue
        else if space
          if @line_char_count >= @max_char
            content.push "\n"
            i = 0

            while i < @indent_level
              content.push @indent_string
              i++
            @line_char_count = 0
          else
            content.push " "
            @line_char_count++
          space = false
        content.push input_char
      (if content.length then content.join("") else "")

    @get_contents_to = (name) ->
      return [ "", "TK_EOF" ]  if @pos is @input.length
      input_char = ""
      content = ""
      reg_match = new RegExp("</" + name + "\\s*>", "igm")
      reg_match.lastIndex = @pos
      reg_array = reg_match.exec(@input)
      end_script = (if reg_array then reg_array.index else @input.length)
      if @pos < end_script
        content = @input.substring(@pos, end_script)
        @pos = end_script
      content

    @record_tag = (tag) ->
      if @tags[tag + "count"]
        @tags[tag + "count"]++
        @tags[tag + @tags[tag + "count"]] = @indent_level
      else
        @tags[tag + "count"] = 1
        @tags[tag + @tags[tag + "count"]] = @indent_level
      @tags[tag + @tags[tag + "count"] + "parent"] = @tags.parent
      @tags.parent = tag + @tags[tag + "count"]

    @retrieve_tag = (tag) ->
      if @tags[tag + "count"]
        temp_parent = @tags.parent
        while temp_parent
          break  if tag + @tags[tag + "count"] is temp_parent
          temp_parent = @tags[temp_parent + "parent"]
        if temp_parent
          @indent_level = @tags[tag + @tags[tag + "count"]]
          @tags.parent = @tags[temp_parent + "parent"]
        delete @tags[tag + @tags[tag + "count"] + "parent"]

        delete @tags[tag + @tags[tag + "count"]]

        if @tags[tag + "count"] is 1
          delete @tags[tag + "count"]
        else
          @tags[tag + "count"]--

    @get_tag = ->
      input_char = ""
      content = []
      space = false
      loop
        return (if content.length then content.join("") else [ "", "TK_EOF" ])  if @pos >= @input.length
        input_char = @input.charAt(@pos)
        @pos++
        @line_char_count++
        if @Utils.in_array(input_char, @Utils.whitespace)
          space = true
          @line_char_count--
          continue
        if input_char is "'" or input_char is "\""
          if not content[1] or content[1] isnt "!"
            input_char += @get_unformatted(input_char)
            space = true
        space = false  if input_char is "="
        if content.length and content[content.length - 1] isnt "=" and input_char isnt ">" and space
          if @line_char_count >= @max_char
            @print_newline false, content
            @line_char_count = 0
          else
            content.push " "
            @line_char_count++
          space = false
        content.push input_char
        break unless input_char isnt ">"
      tag_complete = content.join("")
      tag_index = undefined
      unless tag_complete.indexOf(" ") is -1
        tag_index = tag_complete.indexOf(" ")
      else
        tag_index = tag_complete.indexOf(">")
      tag_check = tag_complete.substring(1, tag_index).toLowerCase()
      if tag_complete.charAt(tag_complete.length - 2) is "/" or @Utils.in_array(tag_check, @Utils.single_token)
        @tag_type = "SINGLE"
      else if tag_check is "script"
        @record_tag tag_check
        @tag_type = "SCRIPT"
      else if tag_check is "style"
        @record_tag tag_check
        @tag_type = "STYLE"
      else if @Utils.in_array(tag_check, unformatted)
        comment = @get_unformatted("</" + tag_check + ">", tag_complete)
        content.push comment
        @tag_type = "SINGLE"
      else if tag_check.charAt(0) is "!"
        unless tag_check.indexOf("[if") is -1
          unless tag_complete.indexOf("!IE") is -1
            comment = @get_unformatted("-->", tag_complete)
            content.push comment
          @tag_type = "START"
        else unless tag_check.indexOf("[endif") is -1
          @tag_type = "END"
          @unindent()
        else unless tag_check.indexOf("[cdata[") is -1
          comment = @get_unformatted("]]>", tag_complete)
          content.push comment
          @tag_type = "SINGLE"
        else
          comment = @get_unformatted("-->", tag_complete)
          content.push comment
          @tag_type = "SINGLE"
      else
        if tag_check.charAt(0) is "/"
          @retrieve_tag tag_check.substring(1)
          @tag_type = "END"
        else
          @record_tag tag_check
          @tag_type = "START"
        @print_newline true, @output  if @Utils.in_array(tag_check, @Utils.extra_liners)
      content.join ""

    @get_unformatted = (delimiter, orig_tag) ->
      return ""  if orig_tag and orig_tag.indexOf(delimiter) isnt -1
      input_char = ""
      content = ""
      space = true
      loop
        return content  if @pos >= @input.length
        input_char = @input.charAt(@pos)
        @pos++
        if @Utils.in_array(input_char, @Utils.whitespace)
          unless space
            @line_char_count--
            continue
          if input_char is "\n" or input_char is "\r"
            content += "\n"
            @line_char_count = 0
            continue
        content += input_char
        @line_char_count++
        space = true
        break unless content.indexOf(delimiter) is -1
      content

    @get_token = ->
      token = undefined
      if @last_token is "TK_TAG_SCRIPT" or @last_token is "TK_TAG_STYLE"
        type = @last_token.substr(7)
        token = @get_contents_to(type)
        return token  if typeof token isnt "string"
        return [ token, "TK_" + type ]
      if @current_mode is "CONTENT"
        token = @get_content()
        if typeof token isnt "string"
          return token
        else
          return [ token, "TK_CONTENT" ]
      if @current_mode is "TAG"
        token = @get_tag()
        if typeof token isnt "string"
          token
        else
          tag_name_type = "TK_TAG_" + @tag_type
          [ token, tag_name_type ]

    @get_full_indent = (level) ->
      level = @indent_level + level or 0
      return ""  if level < 1
      Array(level + 1).join @indent_string

    @printer = (js_source, indent_character, indent_size, max_char, brace_style) ->
      @input = js_source or ""
      @output = []
      @indent_character = indent_character
      @indent_string = ""
      @indent_size = indent_size
      @brace_style = brace_style
      @indent_level = 0
      @max_char = max_char
      @line_char_count = 0
      i = 0

      while i < @indent_size
        @indent_string += @indent_character
        i++
      @print_newline = (ignore, arr) ->
        @line_char_count = 0
        return  if not arr or not arr.length
        arr.pop()  while @Utils.in_array(arr[arr.length - 1], @Utils.whitespace)  unless ignore
        arr.push "\n"
        i = 0

        while i < @indent_level
          arr.push @indent_string
          i++

      @print_token = (text) ->
        @output.push text

      @indent = ->
        @indent_level++

      @unindent = ->
        @indent_level--  if @indent_level > 0

    this
  multi_parser = undefined
  indent_size = undefined
  indent_character = undefined
  max_char = undefined
  brace_style = undefined
  options = options or {}
  indent_size = options.indent_size or 4
  indent_character = options.indent_char or " "
  brace_style = options.brace_style or "collapse"
  max_char = (if options.max_char is 0 then Infinity else options.max_char or 70)
  unformatted = options.unformatted or [ "a" ]
  multi_parser = new Parser()
  multi_parser.printer html_source, indent_character, indent_size, max_char, brace_style
  loop
    t = multi_parser.get_token()
    multi_parser.token_text = t[0]
    multi_parser.token_type = t[1]
    break  if multi_parser.token_type is "TK_EOF"
    switch multi_parser.token_type
      when "TK_TAG_START"
        multi_parser.print_newline false, multi_parser.output
        multi_parser.print_token multi_parser.token_text
        multi_parser.indent()
        multi_parser.current_mode = "CONTENT"
      when "TK_TAG_STYLE", "TK_TAG_SCRIPT"
        multi_parser.print_newline false, multi_parser.output
        multi_parser.print_token multi_parser.token_text
        multi_parser.current_mode = "CONTENT"
      when "TK_TAG_END"
        if multi_parser.last_token is "TK_CONTENT" and multi_parser.last_text is ""
          tag_name = multi_parser.token_text.match(/\w+/)[0]
          tag_extracted_from_last_output = multi_parser.output[multi_parser.output.length - 1].match(/<\s*(\w+)/)
          multi_parser.print_newline true, multi_parser.output  if tag_extracted_from_last_output is null or tag_extracted_from_last_output[1] isnt tag_name
        # console.log "TK Tag End", multi_parser.token_text
        #
        # TODO: Potential Bugfix.
        # Automatically append space after style elements
        # which we would then have to fix afterward with a regex
        # to cleanup any overly eager edits
        multi_parser.print_token multi_parser.token_text
        multi_parser.current_mode = "CONTENT"
      when "TK_TAG_SINGLE"
        multi_parser.print_newline false, multi_parser.output
        multi_parser.print_token multi_parser.token_text
        multi_parser.current_mode = "CONTENT"
      when "TK_CONTENT"
        multi_parser.print_token multi_parser.token_text  if multi_parser.token_text isnt ""
        multi_parser.current_mode = "TAG"
      when "TK_STYLE", "TK_SCRIPT"
        if multi_parser.token_text isnt ""
          multi_parser.output.push "\n"
          text = multi_parser.token_text
          if multi_parser.token_type is "TK_SCRIPT"
            _beautifier = typeof js_beautify is "function" and js_beautify
          else _beautifier = typeof css_beautify is "function" and css_beautify  if multi_parser.token_type is "TK_STYLE"
          if options.indent_scripts is "keep"
            script_indent_level = 0
          else if options.indent_scripts is "separate"
            script_indent_level = -multi_parser.indent_level
          else
            script_indent_level = 1
          indentation = multi_parser.get_full_indent(script_indent_level)
          if _beautifier
            text = _beautifier(text.replace(/^\s*/, indentation), options)
          else
            white = text.match(/^\s*/)[0]
            _level = white.match(/[^\n\r]*$/)[0].split(multi_parser.indent_string).length - 1
            reindent = multi_parser.get_full_indent(script_indent_level - _level)
            text = text.replace(/^\s*/, indentation).replace(/\r\n|\r|\n/g, "\n" + reindent).replace(/\s*$/, "")
          if text
            multi_parser.print_token text
            multi_parser.print_newline true, multi_parser.output
        multi_parser.current_mode = "TAG"
    multi_parser.last_token = multi_parser.token_type
    multi_parser.last_text = multi_parser.token_text
  multi_parser.output.join ""


Luca.define("Luca.tools.Console").extends("Luca.core.Container").with
  className: "luca-ui-console"
  name: "console"
  components:[
    ctype: "code_mirror_field"
    name: "code_output"
    readOnly: true
    lineNumbers: true
    mode: "javascript"
    maxHeight: '200px'
    height: '200px'
  ,
    ctype: "coffee_editor"
    name: "code_input"
    lineNumbers: false
    height: '30px'
    maxHeight: '30px'
    gutter: false
    styles:{"border-top" : "1px solid white"}
    autoBindEventHandlers: true
    onKeyEvent: (instance, keyEvent)->
      if (keyEvent.type is "keydown") and keyEvent.keyCode is 13
        @trigger("command", @compile())

  ]

  getContext: ()->
    window

  onSuccess: (result)->
    Luca("code_output").setValue( source_formatter(JSON.stringify(result)) )
    Luca("code_input").setValue('')

  onError: (error)->

  evaluateCode: (code, bufferId, compile=false)->
    return unless code?.length > 0

    compiled = if compile is true then @getEditor().compileCode(code) else code

    evaluator = ()-> eval( compiled )

    try
      result = evaluator.call( @getContext() )
      @onSuccess(result, bufferId, code)
    catch error
      @onError( error, bufferId, code)

  afterRender: ()->
    Luca.core.Container::afterRender?.apply(@, arguments)
    dev = @
    Luca("code_input").bind "command", ()->
      compiled = @compile()
      if compiled.success is true
        dev.evaluateCode( compiled.compiled )