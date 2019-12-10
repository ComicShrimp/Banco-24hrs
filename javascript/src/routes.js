const express = require("express")
const router = express.Router()

// Componentes
const consultaCliente = require("./components/consultaCliente")
const operacaoCliente = require("./components/operacaoCliente")
const cadastraCliente = require("./components/cadastraCliente")

// Routes
router.post("/cadastro", cadastraCliente.cadastraCliente)
router.get("/:conta", consultaCliente.getCliente)

module.exports = router
