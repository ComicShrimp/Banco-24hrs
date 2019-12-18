const clientes = require("../../utils/database")

module.exports = {
  async cadastraCliente(request, response) {
    const { nome, imagem, senha, cartao, conta, saldo } = request.body

    if (!nome || !senha || !cartao || !conta || !saldo) {
      return response
        .status(400)
        .json({ message: "Campos Obrigatórios Faltando" })
    }

    let url = imagem ? imagem : "https://i.imgur.com/C8Q7oWe.jpg"

    clientes.findOne({ cartao }, function(error, doc) {
      if (doc) {
        return response.status(400).json({ message: "Cartão já cadastrado" })
      }
    })

    clientes.findOne({ conta }, function(error, doc) {
      if (doc) {
        return response.status(400).json({ message: "Conta já cadastrada" })
      }
    })

    let extrato = [{ operacao: "Cliente Criado", valor: saldo, saldo }]

    clientes.insert(
      { nome, imagem: url, senha, cartao, conta, saldo, extrato },
      function(error, doc) {
        if (doc) {
          return response
            .status(200)
            .json({ message: "Cliente cadastrado com sucesso" })
        }
      }
    )

    return response.status(200)
  }
}
