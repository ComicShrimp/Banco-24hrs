const Datastore = require("nedb")
const clientes = new Datastore({
  filename: "database/clientes.db",
  autoload: true
})

module.exports = clientes
