const api = require("../services/api")

async function fazLogin() {
  numeroDaConta = document.getElementById("numeroDaConta")
  senha = document.getElementById("senha")

  window.setTimeout(2000)

  if (numeroDaConta.value.toString().startsWith("5")) {
    const response = await api.get(
      process.env.BANCO_DO_BRASIL_URL + numeroDaConta.value,
      {
        senha: senha.value
      }
    )
    alert("loco")
  } else if (numeroDaConta.value.toString().startsWith("4")) {
  } else if (numeroDaConta.value.toString().startsWith("3")) {
  } else {
    alert("Este Caixa Não Suporta seu Banco")
  }
}
