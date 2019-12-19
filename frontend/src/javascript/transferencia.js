const api = require("../services/api")
require("dotenv").config({
  path: ".env"
})

async function transferencia() {
  let numeroDaConta = document.getElementById("numeroDaConta")

  let url = process.env.BANCO_DO_BRASIL_URL
  if (numeroDaConta.value.toString().startsWith("5")) {
  } else if (numeroDaConta.value.toString().startsWith("4")) {
    url = process.env.ITAU_URL
  } else if (numeroDaConta.value.toString().startsWith("3")) {
    url = process.env.BRADESCO_URL
  } else {
    alert("Este Caixa Não Suporta seu Banco")
    return false
  }

  let senha = sessionStorage.getItem("senha")

  const response = await api.post(
    sessionStorage.getItem("url") +
      sessionStorage.getItem("numeroDaConta") +
      "/saque",
    {
      senha: senha,
      valor: parseFloat(valor.value)
    }
  )

  setTimeout(1000)

  const responses = await api.post(url + numeroDaConta.value + "/deposito", {
    remetente: JSON.parse(sessionStorage.getItem("cliente")).nome,
    valor: parseFloat(valor.value)
  })

  if (responses.status == 200) {
    alert("Depósito Realizado com Sucesso")
    window.location.replace("../html/principal.html")
  } else {
    alert(responses.data.mensagem)
  }
}
