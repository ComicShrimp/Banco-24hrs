const express = require("express")
const router = express.Router()

// Componentes
const consultaCliente = require("./components/consultaCliente")
const operacaoCliente = require("./components/operacaoCliente")
const cadastraCliente = require("./components/cadastraCliente")

// Routes
router.get("/:apelido", consultaCliente.getCliente)
router.post("/cadastra", cadastraCliente.criarCliente)
router.get("/:apelido/extrato", operacaoCliente.extratoCliente)

module.exports = router
