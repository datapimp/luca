# TODO
# 
# This is horrendous code.  I need to replace it ASAP
Luca.concerns.Deferrable = 
  configure_collection: (setAsDeferrable=true)->
    return unless @collection

    if @collection?.deferrable_trigger
      @deferrable_trigger = @collection.deferrable_trigger

    if setAsDeferrable
      @deferrable = @collection

