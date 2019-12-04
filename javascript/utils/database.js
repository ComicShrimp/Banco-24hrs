const Datastore = require("nedb")
const clientes = new Datastore({
  filename: "src/database/clientes.db",
  autoload: true
})

module.exports = clientes
