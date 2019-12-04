const clientes = require("../../utils/database")

module.exports = {
  async criarCliente(request, response) {
    const { nome, cartao, saldo, apelido } = request.body

    if (!apelido || !nome || !cartao || !saldo) {
      return response.status(400).json({ message: "Campos Faltando" })
    }

    let cliente = clientes.findOne({ apelido }, function(error, doc) {
      if (doc) {
        return response.status(400).json({ message: "Cliente já cadastrado" })
      }
    })

    let extrato = [{ operacao: "Cliente Criado", valor: saldo, saldo }]

    clientes.insert({ nome, cartao, saldo, apelido, extrato }, function(
      error,
      doc
    ) {
      if (doc) {
        return response
          .status(200)
          .json({ message: "Cliente cadastrado com sucesso" })
      }
    })

    return response.status(200)
  }
}
