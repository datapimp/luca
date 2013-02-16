#_.def("Luca.components.LoadMask").extends("Luca.View").with
loadMask = Luca.register  "Luca.components.LoadMask"

loadMask.extends          "Luca.View"

loadMask.defines
  className: "luca-ui-load-mask"
  bodyTemplate:"components/load_mask"
