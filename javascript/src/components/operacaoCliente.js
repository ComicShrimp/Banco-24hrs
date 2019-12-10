const clientes = require("./../../utils/database")

module.exports = {
  async depositoCliente(request, response) {
    const { conta } = request.params
    const { remetente, valor } = request.body

    try {
      numeroConta = parseInt(conta)
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Valor enviado não é um numero." })
    }

    clientes.findOne({ conta: numeroConta }, function(error, doc) {
      if (!doc) {
        return response.status(400).json({ message: "Cliente Não Existe" })
      } else {
        doc.saldo = doc.saldo + valor
        doc.extrato.push({
          operacao: "Deposito de " + remetente,
          valor: valor,
          saldo: doc.saldo
        })

        clientes.update({ conta: numeroConta }, doc, {}, function(error, doc) {
          if (doc) {
            return response
              .status(200)
              .json({ mensagem: "Deposito Realizado com sucesso" })
          }
        })
      }
    })

    return response.status(200)
  },

  async saqueCliente(request, response) {
    const { conta } = request.params
    const { valor } = request.body

    try {
      numeroConta = parseInt(conta)
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Valor enviado não é um numero." })
    }

    clientes.findOne({ conta: numeroConta }, function(error, doc) {
      if (!doc) {
        return response.status(400).json({ message: "Cliente Não Existe" })
      } else {
        doc.saldo = doc.saldo - valor
        doc.extrato.push({
          operacao: "Saque na Conta Corrente",
          valor: valor,
          saldo: doc.saldo
        })

        clientes.update({ conta: numeroConta }, doc, { multi: false }, function(
          error,
          doc
        ) {
          if (doc) {
            return response
              .status(200)
              .json({ mensagem: "Saque Realizado com sucesso" })
          }
        })
      }
    })

    return response.status(200)
  },

  async extratoCliente(request, response) {
    const { conta } = request.params
    const { transacoes } = request.body

    try {
      numeroConta = parseInt(conta)
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Valor enviado não é um numero." })
    }

    let numeroTransacoes = transacoes != 0 ? transacoes : 5

    clientes.findOne({ conta: numeroConta }, function(error, doc) {
      if (!doc) {
        return response.status(400).json({ message: "Cliente Não Existe" })
      } else {
        return response
          .status(200)
          .json({ extratos: doc.extrato.slice(0, numeroTransacoes) })
      }
    })
  }
}
