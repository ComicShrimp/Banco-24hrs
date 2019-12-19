const api = require("../services/api")

async function depositar() {
  let senha = document.getElementById("senha")
  let valor = document.getElementById("valor")

  const response = await api.post(
    sessionStorage.getItem("url") +
      sessionStorage.getItem("numeroDaConta") +
      "/deposito",
    {
      remetente: "Deposito no Caixa",
      valor: parseFloat(valor.value)
    }
  )

  if (response.status == 200) {
    alert("Depósito Realizado com Sucesso")
    window.location.replace("../html/principal.html")
  } else {
    alert(response.data.mensagem)
  }
}
