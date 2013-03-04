app = Test.register         "Test.Application"
app.extends                 "Luca.Application"

app.configuration
  name: "TestApp"
  el: "#viewport"
  fluid: true

app.contains
  type: "home"

app.privateMethods
  afterRender: ()->
    Luca.Application::afterRender?.apply(@, arguments)
    app = @
    Luca.CodeSyncManager.setup.call(app)

app.register()