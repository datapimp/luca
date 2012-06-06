#= require ./luca-ui-base
#= require ./luca-ui/components/template
#= require_tree ./luca-ui/components

_.extend Luca, Luca.Events
_.extend Luca.View::, Luca.Events
_.extend Luca.Collection::, Luca.Events
_.extend Luca.Model::, Luca.Events