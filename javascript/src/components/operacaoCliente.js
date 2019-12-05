const clientes = require("./../../utils/database")

module.exports = {
  async depositoCliente(request, response) {
    return response.status(200)
  },

  async saqueCliente(request, response) {
    const apelido = request.params.apelido
    const { valor } = request.body

    let cliente

    clientes.findOne({ apelido }, function(error, doc) {
      if (doc) {
        cliente = doc
      } else {
        return response.status(400).json({ message: "Cliente Não Existe" })
      }
    })

    clientes.update(
      { apelido },
      { $set: { valor: cliente.saldo - valor } },
      { multi: false },
      function(error) {}
    )

    return response.status(200)
  },

  async extratoCliente(request, response) {
    const apelido = request.params.apelido
    const { transacoes } = request.body

    let numeroTransacoes = transacoes != 0 ? transacoes : 5

    clientes.findOne({ apelido }, function(error, doc) {
      if (doc) {
        return response.status(200).json(doc.extrato.slice(0, numeroTransacoes))
      } else {
        return response.status(400).json({ message: "Cliente Não Existe" })
      }
    })

    return response.status(200)
  }
}
