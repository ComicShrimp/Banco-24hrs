const clientes = require("../../utils/database")

module.exports = {
  async getCliente(request, response) {
    const apelido = request.params.apelido

    let cliente = clientes.findOne({ apelido }, function(error, doc) {
      if (doc) {
        return response.status(200).json(doc)
      } else {
        return response.status(400).json({ message: "Cliente Não Existe" })
      }
    })

    return response.status(200)
  }
}
