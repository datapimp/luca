Luca.containers.FieldsetView = Luca.View.extend
  component_type: 'fieldset'

  tagName: 'fieldset'

  className: 'luca-ui-fieldset'

  initialize: (@options={})->
    _.extend @, @options

    Luca.core.Container.prototype.initialize.apply @, arguments

    @components ||= @fields

  prepare_layout: ()->

  prepare_components: ()->
