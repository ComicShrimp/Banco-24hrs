const clientes = require("../../utils/database")

module.exports = {
  async getCliente(request, response) {
    const { conta } = request.params

    try {
      numeroConta = parseInt(conta)
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Valor enviado não é um numero." })
    }

    clientes.findOne({ conta: numeroConta }, function(error, doc) {
      if (doc) {
        return response.status(200).json({
          nome: doc.nome,
          imagem: doc.imagem,
          cartao: doc.cartao,
          saldo: doc.saldo,
          ultimaTransacao: doc.extrato[0]
        })
      } else {
        return response.status(400).json({ message: "Cliente Não Existe" })
      }
    })

    return response.status(200)
  }
}
