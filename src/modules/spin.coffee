# Many thanks to https://github.com/fgnass/spin.js
((window, document, undefined_) ->
  createEl = (tag, prop) ->
    el = document.createElement(tag or "div")
    n = undefined
    for n of prop
      el[n] = prop[n]
    el
  ins = (parent, child1, child2) ->
    ins parent, child2  if child2 and not child2.parentNode
    parent.insertBefore child1, child2 or null
    parent
  addAnimation = (alpha, trail, i, lines) ->
    name = [ "opacity", trail, ~~(alpha * 100), i, lines ].join("-")
    start = 0.01 + i / lines * 100
    z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha)
    prefix = useCssAnimations.substring(0, useCssAnimations.indexOf("Animation")).toLowerCase()
    pre = prefix and "-" + prefix + "-" or ""
    unless animations[name]
      sheet.insertRule "@" + pre + "keyframes " + name + "{" + "0%{opacity:" + z + "}" + start + "%{opacity:" + alpha + "}" + (start + 0.01) + "%{opacity:1}" + (start + trail) % 100 + "%{opacity:" + alpha + "}" + "100%{opacity:" + z + "}" + "}", 0
      animations[name] = 1
    name
  vendor = (el, prop) ->
    s = el.style
    pp = undefined
    i = undefined
    return prop  if s[prop] isnt `undefined`
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    i = 0
    while i < prefixes.length
      pp = prefixes[i] + prop
      return pp  if s[pp] isnt `undefined`
      i++
  css = (el, prop) ->
    for n of prop
      el.style[vendor(el, n) or n] = prop[n]
    el
  merge = (obj) ->
    i = 1

    while i < arguments.length
      def = arguments[i]
      for n of def
        obj[n] = def[n]  if obj[n] is `undefined`
      i++
    obj
  pos = (el) ->
    o =
      x: el.offsetLeft
      y: el.offsetTop

    while (el = el.offsetParent)
      o.x += el.offsetLeft
      o.y += el.offsetTop
    o
  prefixes = [ "webkit", "Moz", "ms", "O" ]
  animations = {}
  useCssAnimations = undefined
  sheet = (->
    el = createEl("style")
    ins document.getElementsByTagName("head")[0], el
    el.sheet or el.styleSheet
  )()
  Spinner = Spinner = (o) ->
    return new Spinner(o)  unless @spin
    @opts = merge(o or {}, Spinner.defaults, defaults)

  defaults = Spinner.defaults =
    lines: 12
    length: 7
    width: 5
    radius: 10
    color: "#000"
    speed: 1
    trail: 100
    opacity: 1 / 4
    fps: 20

  proto = Spinner:: =
    spin: (target) ->
      @stop()
      self = this
      el = self.el = css(createEl(),
        position: "relative"
      )
      ep = undefined
      tp = undefined
      if target
        tp = pos(ins(target, el, target.firstChild))
        ep = pos(el)
        css el,
          left: (target.offsetWidth >> 1) - ep.x + tp.x + "px"
          top: (target.offsetHeight >> 1) - ep.y + tp.y + "px"
      el.setAttribute "aria-role", "progressbar"
      self.lines el, self.opts
      unless useCssAnimations
        o = self.opts
        i = 0
        fps = o.fps
        f = fps / o.speed
        ostep = (1 - o.opacity) / (f * o.trail / 100)
        astep = f / o.lines
        (anim = ->
          i++
          s = o.lines

          while s
            alpha = Math.max(1 - (i + s * astep) % f * ostep, o.opacity)
            self.opacity el, o.lines - s, alpha, o
            s--
          self.timeout = self.el and setTimeout(anim, ~~(1000 / fps))
        )()
      self

    stop: ->
      el = @el
      if el
        clearTimeout @timeout
        el.parentNode.removeChild el  if el.parentNode
        @el = `undefined`
      this

  proto.lines = (el, o) ->
    fill = (color, shadow) ->
      css createEl(),
        position: "absolute"
        width: (o.length + o.width) + "px"
        height: o.width + "px"
        background: color
        boxShadow: shadow
        transformOrigin: "left"
        transform: "rotate(" + ~~(360 / o.lines * i) + "deg) translate(" + o.radius + "px" + ",0)"
        borderRadius: (o.width >> 1) + "px"
    i = 0
    seg = undefined
    while i < o.lines
      seg = css(createEl(),
        position: "absolute"
        top: 1 + ~(o.width / 2) + "px"
        transform: "translate3d(0,0,0)"
        opacity: o.opacity
        animation: useCssAnimations and addAnimation(o.opacity, o.trail, i, o.lines) + " " + 1 / o.speed + "s linear infinite"
      )
      if o.shadow
        ins seg, css(fill("#000", "0 0 4px " + "#000"),
          top: 2 + "px"
        )
      ins el, ins(seg, fill(o.color, "0 0 1px rgba(0,0,0,.1)"))
      i++
    el

  proto.opacity = (el, i, val) ->
    el.childNodes[i].style.opacity = val  if i < el.childNodes.length

  (->
    s = css(createEl("group"),
      behavior: "url(#default#VML)"
    )
    i = undefined
    if not vendor(s, "transform") and s.adj
      i = 4
      while i--
        sheet.addRule [ "group", "roundrect", "fill", "stroke" ][i], "behavior:url(#default#VML)"
      proto.lines = (el, o) ->
        grp = ->
          css createEl("group",
            coordsize: s + " " + s
            coordorigin: -r + " " + -r
          ),
            width: s
            height: s
        seg = (i, dx, filter) ->
          ins g, ins(css(grp(),
            rotation: 360 / o.lines * i + "deg"
            left: ~~dx
          ), ins(css(createEl("roundrect",
            arcsize: 1
          ),
            width: r
            height: o.width
            left: o.radius
            top: -o.width >> 1
            filter: filter
          ), createEl("fill",
            color: o.color
            opacity: o.opacity
          ), createEl("stroke",
            opacity: 0
          )))
        r = o.length + o.width
        s = 2 * r
        g = grp()
        margin = ~(o.length + o.radius + o.width) + "px"
        i = undefined
        if o.shadow
          i = 1
          while i <= o.lines
            seg i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)"
            i++
        i = 1
        while i <= o.lines
          seg i
          i++
        ins css(el,
          margin: margin + " 0 0 " + margin
          zoom: 1
        ), g

      proto.opacity = (el, i, val, o) ->
        c = el.firstChild
        o = o.shadow and o.lines or 0
        if c and i + o < c.childNodes.length
          c = c.childNodes[i + o]
          c = c and c.firstChild
          c = c and c.firstChild
          c.opacity = val  if c
    else
      useCssAnimations = vendor(s, "animation")
  )()
  window.Spinner = Spinner
) window, document


