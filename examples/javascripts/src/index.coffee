BaseView = Backbone.View.extend
  name: "BaseView"
  whoami: ()-> console.log( @name )

DerivedView = BaseView.extend
  name: "DerivedView is my name"
  whoami: ()-> console.log( @name )

$ ->
  console.log "HI"
  base = new BaseView
  console.log base.whoami()

  derived = new DerivedView
  console.log derived.whoami()
  console.log "hi"
  # sheeit
