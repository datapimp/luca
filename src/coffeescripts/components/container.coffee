# A container contains sub views which are displayed
# in a given layout.  Layouts match   
Luca.components.Container = Luca.base.View.extend

  component_type: 'container'

  layout: 'layout'

  initialize: (@options={})->
    @applyLayout()
  
  getLayout: ()-> 
    @layout += "_layout" unless @layout.match(/_layout$/)
    @layout_class = new (Luca.layouts[ _(@layout).classify() ] || Luca.layouts.Layout)

  applyLayout: ()->
    @getLayout().render()


    

