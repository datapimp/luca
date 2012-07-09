#### State Machine

describe "The State Machine", ()->
  it "should accept an attributes and options hash", ->
    sm = new Luca.StateMachine({attribute:"value"},{option:"setting"})
    expect( sm.get("attribute") ).toEqual "value"
    expect( sm.option ).toEqual "setting"

  it "should enable logging when development tools are enabled", ->
    Luca.enableDevelopmentTools = true
    sm = new Luca.StateMachine()
    expect( sm.logging ).toEqual true

  it "should enable logging when logging is set", ->
    Luca.enableDevelopmentTools = false
    sm = new Luca.StateMachine({}, logging: true)

