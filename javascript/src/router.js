const express = require("express")
const router = express.Router()

// Componentes
const consultaCliente = require("./components/consultaCliente")
const operacaoCliente = require("./components/operacaoCliente")

// Routes
router.get("/:apelido", consultaCliente.getCliente)
