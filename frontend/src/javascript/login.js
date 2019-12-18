const api = require("../services/api")
require("dotenv").config({
  path: ".env"
})

async function fazLogin() {
  numeroDaConta = document.getElementById("numeroDaConta")
  senha = document.getElementById("senha")

  if (numeroDaConta.value.toString().startsWith("5")) {
    try {
      const response = await api.get(
        process.env.BANCO_DO_BRASIL_URL + numeroDaConta.value,
        {
          senha: senha.value
        }
      )
      alert(response.data.nome)
    } catch (error) {
      console.log("Deu Errado" + error)
    }
  } else if (numeroDaConta.value.toString().startsWith("4")) {
  } else if (numeroDaConta.value.toString().startsWith("3")) {
  } else {
    alert("Este Caixa Não Suporta seu Banco")
  }
}
