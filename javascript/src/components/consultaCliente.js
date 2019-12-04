const clientes = require("../../utils/database")

module.exports = {
  async getCliente(request, response) {
    const nome = request.params.nome

    let cliente = clientes.findOne({ nome }, function(error, doc) {
      if (doc) {
        return response.status(200).json(doc)
      } else {
        return response.status(400).json({ error: "Cliente Não Existe" })
      }
    })

    return response.status(200)
  }
}
