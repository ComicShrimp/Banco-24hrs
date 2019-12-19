const api = require("../services/api")
require("dotenv").config({
  path: ".env"
})

async function fazLogin() {
  numeroDaConta = document.getElementById("numeroDaConta")
  senha = document.getElementById("senha")

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

  try {
    const response = await api.get(url + numeroDaConta.value, {
      senha: senha.value
    })
    if (response.status != 200) {
      alert("Senha ou Numero da Conta Incorretos")
    } else {
      sessionStorage.setItem("numeroDaConta", numeroDaConta.value)
      sessionStorage.setItem("senha", senha)
      sessionStorage.setItem("url", url)
      sessionStorage.setItem("cliente", JSON.stringify(response.data))
      window.location.replace("../html/principal.html")
    }
  } catch (error) {
    console.log("Deu Errado" + error)
  }
}
