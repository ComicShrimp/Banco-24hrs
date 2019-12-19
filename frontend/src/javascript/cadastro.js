const api = require("../services/api")
require("dotenv").config({
  path: ".env"
})

async function verificaCampos() {
  let selecionaBanco = document.getElementById("selecionaBanco")
  let selecionado = selecionaBanco.options[selecionaBanco.selectedIndex].value

  let nome = document.getElementById("nome")
  let senha = document.getElementById("senha")
  let senha2 = document.getElementById("senha2")
  let saldoInicial = document.getElementById("saldo")

  if (senha.value != senha2.value) {
    alert("As senhas devem ser iguais")
  } else {
    let prefixo = "5"
    let url = process.env.BANCO_DO_BRASIL_URL
    if (selecionado == "Itau") {
      prefixo = "4"
      url = process.env.ITAU_URL
    } else if (selecionado == "Bradesco") {
      prefixo = "3"
      url = process.env.BRADESCO_URL
    }

    let numeroConta = Math.floor(Math.random() * 9999) + 1000
    let numeroCartao = Math.floor(Math.random() * 99999999) + 10000000

    numeroConta = parseInt(prefixo + numeroConta)
    numeroCartao = parseInt(prefixo + numeroCartao)

    const response = await api.post(url + "cadastro", {
      nome: nome.value,
      imagem: "https://i.imgur.com/C8Q7oWe.jpg",
      senha: senha.value,
      cartao: numeroCartao,
      conta: numeroConta,
      saldo: parseFloat(saldoInicial.value)
    })

    alert(response.data.message + "\nSeu numero da conta é: " + numeroConta)
  }
}
