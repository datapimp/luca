// ============== Formatting extensions ============================
// A common storage for all mode-specific formatting features
if (!CodeMirror.modeExtensions) CodeMirror.modeExtensions = {};

// Returns the extension of the editor's current mode
CodeMirror.defineExtension("getModeExt", function () {
  var mname = CodeMirror.resolveMode(this.getOption("mode")).name;
  var ext = CodeMirror.modeExtensions[mname];
  if (!ext) throw new Error("No extensions found for mode " + mname);
  return ext;
});

// If the current mode is 'htmlmixed', returns the extension of a mode located at
// the specified position (can be htmlmixed, css or javascript). Otherwise, simply
// returns the extension of the editor's current mode.
CodeMirror.defineExtension("getModeExtAtPos", function (pos) {
  var token = this.getTokenAt(pos);
  if (token && token.state && token.state.mode)
    return CodeMirror.modeExtensions[token.state.mode == "html" ? "htmlmixed" : token.state.mode];
  else
    return this.getModeExt();
});

// Comment/uncomment the specified range
CodeMirror.defineExtension("commentRange", function (isComment, from, to) {
  var curMode = this.getModeExtAtPos(this.getCursor());
  if (isComment) { // Comment range
    var commentedText = this.getRange(from, to);
    this.replaceRange(curMode.commentStart + this.getRange(from, to) + curMode.commentEnd
      , from, to);
    if (from.line == to.line && from.ch == to.ch) { // An empty comment inserted - put cursor inside
      this.setCursor(from.line, from.ch + curMode.commentStart.length);
    }
  }
  else { // Uncomment range
    var selText = this.getRange(from, to);
    var startIndex = selText.indexOf(curMode.commentStart);
    var endIndex = selText.lastIndexOf(curMode.commentEnd);
    if (startIndex > -1 && endIndex > -1 && endIndex > startIndex) {
      // Take string till comment start
      selText = selText.substr(0, startIndex)
      // From comment start till comment end
        + selText.substring(startIndex + curMode.commentStart.length, endIndex)
      // From comment end till string end
        + selText.substr(endIndex + curMode.commentEnd.length);
    }
    this.replaceRange(selText, from, to);
  }
});

// Applies automatic mode-aware indentation to the specified range
CodeMirror.defineExtension("autoIndentRange", function (from, to) {
  var cmInstance = this;
  this.operation(function () {
    for (var i = from.line; i <= to.line; i++) {
      cmInstance.indentLine(i, "smart");
    }
  });
});

// Applies automatic formatting to the specified range
CodeMirror.defineExtension("autoFormatRange", function (from, to) {
  var absStart = this.indexFromPos(from);
  var absEnd = this.indexFromPos(to);
  // Insert additional line breaks where necessary according to the
  // mode's syntax
  var res = this.getModeExt().autoFormatLineBreaks(this.getValue(), absStart, absEnd);
  var cmInstance = this;

  // Replace and auto-indent the range
  this.operation(function () {
    cmInstance.replaceRange(res, from, to);
    var startLine = cmInstance.posFromIndex(absStart).line;
    var endLine = cmInstance.posFromIndex(absStart + res.length).line;
    for (var i = startLine; i <= endLine; i++) {
      cmInstance.indentLine(i, "smart");
    }
  });
});

// Define extensions for a few modes

CodeMirror.modeExtensions["css"] = {
  commentStart: "/*",
  commentEnd: "*/",
  wordWrapChars: [";", "\\{", "\\}"],
  autoFormatLineBreaks: function (text, startPos, endPos) {
    text = text.substring(startPos, endPos);
    return text.replace(new RegExp("(;|\\{|\\})([^\r\n])", "g"), "$1\n$2");
  }
};

CodeMirror.modeExtensions["javascript"] = {
  commentStart: "/*",
  commentEnd: "*/",
  wordWrapChars: [";", "\\{", "\\}"],

  getNonBreakableBlocks: function (text) {
    var nonBreakableRegexes = [
        new RegExp("for\\s*?\\(([\\s\\S]*?)\\)"),
        new RegExp("'([\\s\\S]*?)('|$)"),
        new RegExp("\"([\\s\\S]*?)(\"|$)"),
        new RegExp("//.*([\r\n]|$)")
      ];
    var nonBreakableBlocks = new Array();
    for (var i = 0; i < nonBreakableRegexes.length; i++) {
      var curPos = 0;
      while (curPos < text.length) {
        var m = text.substr(curPos).match(nonBreakableRegexes[i]);
        if (m != null) {
          nonBreakableBlocks.push({
            start: curPos + m.index,
            end: curPos + m.index + m[0].length
          });
          curPos += m.index + Math.max(1, m[0].length);
        }
        else { // No more matches
          break;
        }
      }
    }
    nonBreakableBlocks.sort(function (a, b) {
      return a.start - b.start;
    });

    return nonBreakableBlocks;
  },

  autoFormatLineBreaks: function (text, startPos, endPos) {
    text = text.substring(startPos, endPos);
    var curPos = 0;
    var reLinesSplitter = new RegExp("(;|\\{|\\})([^\r\n])", "g");
    var nonBreakableBlocks = this.getNonBreakableBlocks(text);
    if (nonBreakableBlocks != null) {
      var res = "";
      for (var i = 0; i < nonBreakableBlocks.length; i++) {
        if (nonBreakableBlocks[i].start > curPos) { // Break lines till the block
          res += text.substring(curPos, nonBreakableBlocks[i].start).replace(reLinesSplitter, "$1\n$2");
          curPos = nonBreakableBlocks[i].start;
        }
        if (nonBreakableBlocks[i].start <= curPos
          && nonBreakableBlocks[i].end >= curPos) { // Skip non-breakable block
          res += text.substring(curPos, nonBreakableBlocks[i].end);
          curPos = nonBreakableBlocks[i].end;
        }
      }
      if (curPos < text.length - 1) {
        res += text.substr(curPos).replace(reLinesSplitter, "$1\n$2");
      }
      return res;
    }
    else {
      return text.replace(reLinesSplitter, "$1\n$2");
    }
  }
};

CodeMirror.modeExtensions["xml"] = {
  commentStart: "<!--",
  commentEnd: "-->",
  wordWrapChars: [">"],

  autoFormatLineBreaks: function (text, startPos, endPos) {
    text = text.substring(startPos, endPos);
    var lines = text.split("\n");
    var reProcessedPortion = new RegExp("(^\\s*?<|^[^<]*?)(.+)(>\\s*?$|[^>]*?$)");
    var reOpenBrackets = new RegExp("<", "g");
    var reCloseBrackets = new RegExp("(>)([^\r\n])", "g");
    for (var i = 0; i < lines.length; i++) {
      var mToProcess = lines[i].match(reProcessedPortion);
      if (mToProcess != null && mToProcess.length > 3) { // The line starts with whitespaces and ends with whitespaces
        lines[i] = mToProcess[1]
            + mToProcess[2].replace(reOpenBrackets, "\n$&").replace(reCloseBrackets, "$1\n$2")
            + mToProcess[3];
        continue;
      }
    }

    return lines.join("\n");
  }
};

CodeMirror.modeExtensions["htmlmixed"] = {
  commentStart: "<!--",
  commentEnd: "-->",
  wordWrapChars: [">", ";", "\\{", "\\}"],

  getModeInfos: function (text, absPos) {
    var modeInfos = new Array();
    modeInfos[0] =
      {
        pos: 0,
        modeExt: CodeMirror.modeExtensions["xml"],
        modeName: "xml"
      };

    var modeMatchers = new Array();
    modeMatchers[0] =
      {
        regex: new RegExp("<style[^>]*>([\\s\\S]*?)(</style[^>]*>|$)", "i"),
        modeExt: CodeMirror.modeExtensions["css"],
        modeName: "css"
      };
    modeMatchers[1] =
      {
        regex: new RegExp("<script[^>]*>([\\s\\S]*?)(</script[^>]*>|$)", "i"),
        modeExt: CodeMirror.modeExtensions["javascript"],
        modeName: "javascript"
      };

    var lastCharPos = (typeof (absPos) !== "undefined" ? absPos : text.length - 1);
    // Detect modes for the entire text
    for (var i = 0; i < modeMatchers.length; i++) {
      var curPos = 0;
      while (curPos <= lastCharPos) {
        var m = text.substr(curPos).match(modeMatchers[i].regex);
        if (m != null) {
          if (m.length > 1 && m[1].length > 0) {
            // Push block begin pos
            var blockBegin = curPos + m.index + m[0].indexOf(m[1]);
            modeInfos.push(
              {
                pos: blockBegin,
                modeExt: modeMatchers[i].modeExt,
                modeName: modeMatchers[i].modeName
              });
            // Push block end pos
            modeInfos.push(
              {
                pos: blockBegin + m[1].length,
                modeExt: modeInfos[0].modeExt,
                modeName: modeInfos[0].modeName
              });
            curPos += m.index + m[0].length;
            continue;
          }
          else {
            curPos += m.index + Math.max(m[0].length, 1);
          }
        }
        else { // No more matches
          break;
        }
      }
    }
    // Sort mode infos
    modeInfos.sort(function sortModeInfo(a, b) {
      return a.pos - b.pos;
    });

    return modeInfos;
  },

  autoFormatLineBreaks: function (text, startPos, endPos) {
    var modeInfos = this.getModeInfos(text);
    var reBlockStartsWithNewline = new RegExp("^\\s*?\n");
    var reBlockEndsWithNewline = new RegExp("\n\\s*?$");
    var res = "";
    // Use modes info to break lines correspondingly
    if (modeInfos.length > 1) { // Deal with multi-mode text
      for (var i = 1; i <= modeInfos.length; i++) {
        var selStart = modeInfos[i - 1].pos;
        var selEnd = (i < modeInfos.length ? modeInfos[i].pos : endPos);

        if (selStart >= endPos) { // The block starts later than the needed fragment
          break;
        }
        if (selStart < startPos) {
          if (selEnd <= startPos) { // The block starts earlier than the needed fragment
            continue;
          }
          selStart = startPos;
        }
        if (selEnd > endPos) {
          selEnd = endPos;
        }
        var textPortion = text.substring(selStart, selEnd);
        if (modeInfos[i - 1].modeName != "xml") { // Starting a CSS or JavaScript block
          if (!reBlockStartsWithNewline.test(textPortion)
              && selStart > 0) { // The block does not start with a line break
            textPortion = "\n" + textPortion;
          }
          if (!reBlockEndsWithNewline.test(textPortion)
              && selEnd < text.length - 1) { // The block does not end with a line break
            textPortion += "\n";
          }
        }
        res += modeInfos[i - 1].modeExt.autoFormatLineBreaks(textPortion);
      }
    }
    else { // Single-mode text
      res = modeInfos[0].modeExt.autoFormatLineBreaks(text.substring(startPos, endPos));
    }

    return res;
  }
};
CodeMirror.defineMode("xml", function(config, parserConfig) {
  var indentUnit = config.indentUnit;
  var Kludges = parserConfig.htmlMode ? {
    autoSelfClosers: {'area': true, 'base': true, 'br': true, 'col': true, 'command': true,
                      'embed': true, 'frame': true, 'hr': true, 'img': true, 'input': true,
                      'keygen': true, 'link': true, 'meta': true, 'param': true, 'source': true,
                      'track': true, 'wbr': true},
    implicitlyClosed: {'dd': true, 'li': true, 'optgroup': true, 'option': true, 'p': true,
                       'rp': true, 'rt': true, 'tbody': true, 'td': true, 'tfoot': true,
                       'th': true, 'tr': true},
    contextGrabbers: {
      'dd': {'dd': true, 'dt': true},
      'dt': {'dd': true, 'dt': true},
      'li': {'li': true},
      'option': {'option': true, 'optgroup': true},
      'optgroup': {'optgroup': true},
      'p': {'address': true, 'article': true, 'aside': true, 'blockquote': true, 'dir': true,
            'div': true, 'dl': true, 'fieldset': true, 'footer': true, 'form': true,
            'h1': true, 'h2': true, 'h3': true, 'h4': true, 'h5': true, 'h6': true,
            'header': true, 'hgroup': true, 'hr': true, 'menu': true, 'nav': true, 'ol': true,
            'p': true, 'pre': true, 'section': true, 'table': true, 'ul': true},
      'rp': {'rp': true, 'rt': true},
      'rt': {'rp': true, 'rt': true},
      'tbody': {'tbody': true, 'tfoot': true},
      'td': {'td': true, 'th': true},
      'tfoot': {'tbody': true},
      'th': {'td': true, 'th': true},
      'thead': {'tbody': true, 'tfoot': true},
      'tr': {'tr': true}
    },
    doNotIndent: {"pre": true},
    allowUnquoted: true,
    allowMissing: false
  } : {
    autoSelfClosers: {},
    implicitlyClosed: {},
    contextGrabbers: {},
    doNotIndent: {},
    allowUnquoted: false,
    allowMissing: false
  };
  var alignCDATA = parserConfig.alignCDATA;

  // Return variables for tokenizers
  var tagName, type;

  function inText(stream, state) {
    function chain(parser) {
      state.tokenize = parser;
      return parser(stream, state);
    }

    var ch = stream.next();
    if (ch == "<") {
      if (stream.eat("!")) {
        if (stream.eat("[")) {
          if (stream.match("CDATA[")) return chain(inBlock("atom", "]]>"));
          else return null;
        }
        else if (stream.match("--")) return chain(inBlock("comment", "-->"));
        else if (stream.match("DOCTYPE", true, true)) {
          stream.eatWhile(/[\w\._\-]/);
          return chain(doctype(1));
        }
        else return null;
      }
      else if (stream.eat("?")) {
        stream.eatWhile(/[\w\._\-]/);
        state.tokenize = inBlock("meta", "?>");
        return "meta";
      }
      else {
        type = stream.eat("/") ? "closeTag" : "openTag";
        stream.eatSpace();
        tagName = "";
        var c;
        while ((c = stream.eat(/[^\s\u00a0=<>\"\'\/?]/))) tagName += c;
        state.tokenize = inTag;
        return "tag";
      }
    }
    else if (ch == "&") {
      var ok;
      if (stream.eat("#")) {
        if (stream.eat("x")) {
          ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
        } else {
          ok = stream.eatWhile(/[\d]/) && stream.eat(";");
        }
      } else {
        ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
      }
      return ok ? "atom" : "error";
    }
    else {
      stream.eatWhile(/[^&<]/);
      return null;
    }
  }

  function inTag(stream, state) {
    var ch = stream.next();
    if (ch == ">" || (ch == "/" && stream.eat(">"))) {
      state.tokenize = inText;
      type = ch == ">" ? "endTag" : "selfcloseTag";
      return "tag";
    }
    else if (ch == "=") {
      type = "equals";
      return null;
    }
    else if (/[\'\"]/.test(ch)) {
      state.tokenize = inAttribute(ch);
      return state.tokenize(stream, state);
    }
    else {
      stream.eatWhile(/[^\s\u00a0=<>\"\'\/?]/);
      return "word";
    }
  }

  function inAttribute(quote) {
    return function(stream, state) {
      while (!stream.eol()) {
        if (stream.next() == quote) {
          state.tokenize = inTag;
          break;
        }
      }
      return "string";
    };
  }

  function inBlock(style, terminator) {
    return function(stream, state) {
      while (!stream.eol()) {
        if (stream.match(terminator)) {
          state.tokenize = inText;
          break;
        }
        stream.next();
      }
      return style;
    };
  }
  function doctype(depth) {
    return function(stream, state) {
      var ch;
      while ((ch = stream.next()) != null) {
        if (ch == "<") {
          state.tokenize = doctype(depth + 1);
          return state.tokenize(stream, state);
        } else if (ch == ">") {
          if (depth == 1) {
            state.tokenize = inText;
            break;
          } else {
            state.tokenize = doctype(depth - 1);
            return state.tokenize(stream, state);
          }
        }
      }
      return "meta";
    };
  }

  var curState, setStyle;
  function pass() {
    for (var i = arguments.length - 1; i >= 0; i--) curState.cc.push(arguments[i]);
  }
  function cont() {
    pass.apply(null, arguments);
    return true;
  }

  function pushContext(tagName, startOfLine) {
    var noIndent = Kludges.doNotIndent.hasOwnProperty(tagName) || (curState.context && curState.context.noIndent);
    curState.context = {
      prev: curState.context,
      tagName: tagName,
      indent: curState.indented,
      startOfLine: startOfLine,
      noIndent: noIndent
    };
  }
  function popContext() {
    if (curState.context) curState.context = curState.context.prev;
  }

  function element(type) {
    if (type == "openTag") {
      curState.tagName = tagName;
      return cont(attributes, endtag(curState.startOfLine));
    } else if (type == "closeTag") {
      var err = false;
      if (curState.context) {
        if (curState.context.tagName != tagName) {
          if (Kludges.implicitlyClosed.hasOwnProperty(curState.context.tagName.toLowerCase())) {
            popContext();
          }
          err = !curState.context || curState.context.tagName != tagName;
        }
      } else {
        err = true;
      }
      if (err) setStyle = "error";
      return cont(endclosetag(err));
    }
    return cont();
  }
  function endtag(startOfLine) {
    return function(type) {
      if (type == "selfcloseTag" ||
          (type == "endTag" && Kludges.autoSelfClosers.hasOwnProperty(curState.tagName.toLowerCase()))) {
        maybePopContext(curState.tagName.toLowerCase());
        return cont();
      }
      if (type == "endTag") {
        maybePopContext(curState.tagName.toLowerCase());
        pushContext(curState.tagName, startOfLine);
        return cont();
      }
      return cont();
    };
  }
  function endclosetag(err) {
    return function(type) {
      if (err) setStyle = "error";
      if (type == "endTag") { popContext(); return cont(); }
      setStyle = "error";
      return cont(arguments.callee);
    }
  }
  function maybePopContext(nextTagName) {
    var parentTagName;
    while (true) {
      if (!curState.context) {
        return;
      }
      parentTagName = curState.context.tagName.toLowerCase();
      if (!Kludges.contextGrabbers.hasOwnProperty(parentTagName) ||
          !Kludges.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) {
        return;
      }
      popContext();
    }
  }

  function attributes(type) {
    if (type == "word") {setStyle = "attribute"; return cont(attribute, attributes);}
    if (type == "endTag" || type == "selfcloseTag") return pass();
    setStyle = "error";
    return cont(attributes);
  }
  function attribute(type) {
    if (type == "equals") return cont(attvalue, attributes);
    if (!Kludges.allowMissing) setStyle = "error";
    return (type == "endTag" || type == "selfcloseTag") ? pass() : cont();
  }
  function attvalue(type) {
    if (type == "string") return cont(attvaluemaybe);
    if (type == "word" && Kludges.allowUnquoted) {setStyle = "string"; return cont();}
    setStyle = "error";
    return (type == "endTag" || type == "selfCloseTag") ? pass() : cont();
  }
  function attvaluemaybe(type) {
    if (type == "string") return cont(attvaluemaybe);
    else return pass();
  }

  return {
    startState: function() {
      return {tokenize: inText, cc: [], indented: 0, startOfLine: true, tagName: null, context: null};
    },

    token: function(stream, state) {
      if (stream.sol()) {
        state.startOfLine = true;
        state.indented = stream.indentation();
      }
      if (stream.eatSpace()) return null;

      setStyle = type = tagName = null;
      var style = state.tokenize(stream, state);
      state.type = type;
      if ((style || type) && style != "comment") {
        curState = state;
        while (true) {
          var comb = state.cc.pop() || element;
          if (comb(type || style)) break;
        }
      }
      state.startOfLine = false;
      return setStyle || style;
    },

    indent: function(state, textAfter, fullLine) {
      var context = state.context;
      if ((state.tokenize != inTag && state.tokenize != inText) ||
          context && context.noIndent)
        return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
      if (alignCDATA && /<!\[CDATA\[/.test(textAfter)) return 0;
      if (context && /^<\//.test(textAfter))
        context = context.prev;
      while (context && !context.startOfLine)
        context = context.prev;
      if (context) return context.indent + indentUnit;
      else return 0;
    },

    compareStates: function(a, b) {
      if (a.indented != b.indented || a.tokenize != b.tokenize) return false;
      for (var ca = a.context, cb = b.context; ; ca = ca.prev, cb = cb.prev) {
        if (!ca || !cb) return ca == cb;
        if (ca.tagName != cb.tagName) return false;
      }
    },

    electricChars: "/"
  };
});

CodeMirror.defineMIME("application/xml", "xml");
if (!CodeMirror.mimeModes.hasOwnProperty("text/html"))
  CodeMirror.defineMIME("text/html", {name: "xml", htmlMode: true});
CodeMirror.defineMode("htmlmixed", function(config, parserConfig) {
  var htmlMode = CodeMirror.getMode(config, {name: "xml", htmlMode: true});
  var jsMode = CodeMirror.getMode(config, "javascript");
  var cssMode = CodeMirror.getMode(config, "css");

  function html(stream, state) {
    var style = htmlMode.token(stream, state.htmlState);
    if (style == "tag" && stream.current() == ">" && state.htmlState.context) {
      if (/^script$/i.test(state.htmlState.context.tagName)) {
        state.token = javascript;
        state.localState = jsMode.startState(htmlMode.indent(state.htmlState, ""));
        state.mode = "javascript";
      }
      else if (/^style$/i.test(state.htmlState.context.tagName)) {
        state.token = css;
        state.localState = cssMode.startState(htmlMode.indent(state.htmlState, ""));
        state.mode = "css";
      }
    }
    return style;
  }
  function maybeBackup(stream, pat, style) {
    var cur = stream.current();
    var close = cur.search(pat);
    if (close > -1) stream.backUp(cur.length - close);
    return style;
  }
  function javascript(stream, state) {
    if (stream.match(/^<\/\s*script\s*>/i, false)) {
      state.token = html;
      state.localState = null;
      state.mode = "html";
      return html(stream, state);
    }
    return maybeBackup(stream, /<\/\s*script\s*>/,
                       jsMode.token(stream, state.localState));
  }
  function css(stream, state) {
    if (stream.match(/^<\/\s*style\s*>/i, false)) {
      state.token = html;
      state.localState = null;
      state.mode = "html";
      return html(stream, state);
    }
    return maybeBackup(stream, /<\/\s*style\s*>/,
                       cssMode.token(stream, state.localState));
  }

  return {
    startState: function() {
      var state = htmlMode.startState();
      return {token: html, localState: null, mode: "html", htmlState: state};
    },

    copyState: function(state) {
      if (state.localState)
        var local = CodeMirror.copyState(state.token == css ? cssMode : jsMode, state.localState);
      return {token: state.token, localState: local, mode: state.mode,
              htmlState: CodeMirror.copyState(htmlMode, state.htmlState)};
    },

    token: function(stream, state) {
      return state.token(stream, state);
    },

    indent: function(state, textAfter) {
      if (state.token == html || /^\s*<\//.test(textAfter))
        return htmlMode.indent(state.htmlState, textAfter);
      else if (state.token == javascript)
        return jsMode.indent(state.localState, textAfter);
      else
        return cssMode.indent(state.localState, textAfter);
    },

    compareStates: function(a, b) {
      if (a.mode != b.mode) return false;
      if (a.localState) return CodeMirror.Pass;
      return htmlMode.compareStates(a.htmlState, b.htmlState);
    },

    electricChars: "/{}:"
  }
}, "xml", "javascript", "css");

CodeMirror.defineMIME("text/html", "htmlmixed");