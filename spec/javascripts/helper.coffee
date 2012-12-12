# thanks player
# https://github.com/thefrontside/jasmine.backbone.js

json = (object) ->
  JSON.stringify object

msg = (list) ->
  (if list.length isnt 0 then list.join(";") else "")

eventBucket = (model, eventName) ->
  spiedEvents = model.spiedEvents
  spiedEvents = model.spiedEvents = {}  unless spiedEvents
  bucket = spiedEvents[eventName]
  bucket = spiedEvents[eventName] = []  unless bucket
  bucket

triggerSpy = (constructor) ->
  trigger = constructor::trigger
  constructor::trigger = (eventName) ->
    bucket = eventBucket(this, eventName)
    bucket.push Array::slice.call(arguments, 1)
    trigger.apply this, arguments

triggerSpy Backbone.Model
triggerSpy Backbone.Collection
triggerSpy Backbone.View

EventMatchers =
  toHaveTriggered: (eventName) ->
    bucket = eventBucket(@actual, eventName)
    triggeredWith = Array::slice.call(arguments, 1)
    @message = ->
      [ "expected model or collection to have received '" + eventName + "' with " + json(triggeredWith), "expected model not to have received event '" + eventName + "', but it did" ]

    _.detect bucket, (args) ->
      if triggeredWith.length is 0
        true
      else
        jasmine.getEnv().equals_ triggeredWith, args

ModelMatchers =
  toHaveAttributes: (attributes) ->
    keys = []
    values = []
    jasmine.getEnv().equals_ @actual.attributes, attributes, keys, values
    missing = []
    i = 0

    while i < keys.length
      message = keys[i]
      missing.push keys[i]  if message.match(/but missing from/)
      i++
    @message = ->
      [ "model should have at least these attributes(" + json(attributes) + ") " + msg(missing) + " " + msg(values), "model should have none of the following attributes(" + json(attributes) + ") " + msg(keys) + " " + msg(values) ]

    missing.length is 0 and values.length is 0

  toHaveExactlyTheseAttributes: (attributes) ->
    keys = []
    values = []
    equal = jasmine.getEnv().equals_(@actual.attributes, attributes, keys, values)
    @message = ->
      [ "model should match exact attributes, but does not. " + msg(keys) + " " + msg(values), "model has exactly these attributes, but shouldn't :" + json(attributes) ]

    equal

createFakeServer = ->
  server = sinon.fakeServer.create()
  server.respondWith("GET", "/models", [
    200,
    {"Content-Type":"application/json"},
    '[{"id":1,"attr1":"value1","attr2":"value2"},{"id":2,"attr1":"value1","attr2":"value2"}]'
  ])
  server.respondWith("GET", "/rooted/models", [
    200,
    {"Content-Type":"application/json"},
    '{"root":[{"id":1,"attr1":"value1","attr2":"value2"},{"id":2,"attr1":"value1","attr2":"value2"}]}'
  ])
  server.respondWith("GET", "/empty", [
    200,
    {"Content-Type":"application/json"},
    '[]'
  ])
  server

spyMatchers = "called calledOnce calledTwice calledThrice calledBefore calledAfter calledOn alwaysCalledOn calledWith alwaysCalledWith calledWithExactly alwaysCalledWithExactly".split(" ")
i = spyMatchers.length
spyMatcherHash = {}
unusualMatchers =
  returned: "toHaveReturned"
  alwaysReturned: "toHaveAlwaysReturned"
  threw: "toHaveThrown"
  alwaysThrew: "toHaveAlwaysThrown"

getMatcherFunction = (sinonName) ->
  ->
    sinonProperty = @actual[sinonName]
    (if (typeof sinonProperty is "function") then sinonProperty.apply(@actual, arguments) else sinonProperty)

while i--
  sinonName = spyMatchers[i]
  matcherName = "toHaveBeen" + sinonName.charAt(0).toUpperCase() + sinonName.slice(1)
  spyMatcherHash[matcherName] = getMatcherFunction(sinonName)
for j of unusualMatchers
  spyMatcherHash[unusualMatchers[j]] = getMatcherFunction(j)

window.sinonJasmine =
  getMatchers: ->
    spyMatcherHash

#### Loadup Jasmine
beforeEach ->
  @server = createFakeServer()

  @addMatchers ModelMatchers
  @addMatchers EventMatchers
  @addMatchers sinonJasmine.getMatchers()

afterEach ->
  @server.restore()
