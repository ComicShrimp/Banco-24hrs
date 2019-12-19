const api = require("../services/api")

async function sacarDinheiro() {
  let senha = document.getElementById("senha")
  let valor = document.getElementById("valor")

  const response = await api.post(
    sessionStorage.getItem("url") +
      sessionStorage.getItem("numeroDaConta") +
      "/saque",
    {
      senha: senha.value,
      valor: valor.value
    }
  )

  if (response.status == 200) {
    alert("Saque Realizado com Sucesso")
    window.location.replace("../html/principal.html")
  } else {
    alert(response.data.mensagem)
  }
}
