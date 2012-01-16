Luca.containers.SplitView = Luca.core.Container.extend 
  layout: '100'

  componentType: 'split_view'

  containerTemplate: 'containers/basic'

  className: 'luca-ui-split-view' 
  
  componentClass: 'luca-ui-panel'

Luca.register 'split_view', "Luca.containers.SplitView"
