_.def("Luca.tools.ClassBrowserList").extends("Luca.View").with
  tagName: "ul"
  className: "nav nav-list class-browser-list"

  autoBindEventHandlers: true

  events:
    "click li.namespace a" : "namespaceClickHandler"
    "click li.className a" : "classClickHandler"

  initialize: (@options={})->
    @deferrable = @collection = new Luca.collections.Components()

  collapseAllNamespaceLists: ()->
    @$('ul.classList').collapse('hide')

  namespaceClickHandler: (e)->
    me = my = $( e.target )
    classList = my.siblings('.classList')
    classList.collapse('toggle')

  classClickHandler: (e)->
    e.preventDefault()

    me = my = $( e.currentTarget )
    className = my.data('component')
    list = @

    model = @collection.detect (component)->
      component.get("className") is className

    if model and !model.get("contents")
      # TODO Why is this firing twice?
      model.fetch success: _.once (model, response)->
        list.trigger "component:loaded", model, response

  afterRender: ()->
    @collapseAllNamespaceLists()
    Luca.View::afterRender?.apply(@, arguments)

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
          link = tree.make("a",{"data-component":fullName}, fullName)
          classId = fullName.toLowerCase().replace(/\./g, '-')
          tree.make "li", {class:"className #{ classId }"}, link

        cul = tree.make "ul", {class:"classList"}, classElements
        $( nli ).append( cul )
        nli

      ul = tree.make "ul",{class:"namespace"}, namespaceElements

      $( li ).append(ul)
      tree.$append( li )

    @attach()