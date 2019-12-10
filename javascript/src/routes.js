const express = require("express")
const router = express.Router()

// Componentes
const consultaCliente = require("./components/consultaCliente")
const operacaoCliente = require("./components/operacaoCliente")
const cadastraCliente = require("./components/cadastraCliente")

//

// Cria e Recupera o Cliente
router.post("/cadastro", cadastraCliente.cadastraCliente)
router.get("/:conta", consultaCliente.getCliente)

// Interações com clientes
router.post("/:conta/saque", operacaoCliente.saqueCliente)
router.post("/:conta/deposito", operacaoCliente.depositoCliente)
router.get("/:conta/extrato", operacaoCliente.extratoCliente)

module.exports = router
