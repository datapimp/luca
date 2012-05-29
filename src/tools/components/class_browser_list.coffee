_.def("Luca.tools.ClassBrowserList").extends("Luca.View").with
  tagName: "ul"
  className: "nav nav-list class-browser-list"

  events:
    "click li.namespace" : "namespaceClickHandler"
    "click li.className" : "classClickHandler"

  initialize: (@options={})->
    @deferrable = @collection = new Luca.collections.Components()

  namespaceClickHandler: (e)->

  classClickHandler: (e)->

  afterRender: ()->
    @$('ul.classList').collapse('hide')

  attach: _.once( Luca.View::$attach )

  render: ()->
    tree = @
    data = @collection.asTree()

    _( data ).each (namespace, root)->
      target = tree.make("a",{},root)
      li = tree.make("li",class:"root", target)
      namespaceList = _( namespace ).keys()

      namespaceElements = _( namespaceList ).map (namespace)->
        classId = namespace.toLowerCase().replace(/\./g, '-')
        target = tree.make("a",{},namespace)
        nli = tree.make "li", {class:"namespace #{ classId }"}, target

        resolved = Luca.util.resolve(namespace, (window || global))
        classes = _( resolved ).keys()
        classElements = _( classes ).map (componentClass)->
          fullName = "#{ namespace }.#{ componentClass }"
          classId = fullName.toLowerCase().replace(/\./g, '-')
          tree.make "li", {class:"className #{ classId }"}, fullName
        cul = tree.make "ul", {class:"classList"}, classElements
        $( nli ).append( cul )
        nli

      ul = tree.make "ul",{class:"namespace"}, namespaceElements

      $( li ).append(ul)
      tree.$append( li )

    @attach()