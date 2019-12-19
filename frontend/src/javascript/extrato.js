const api = require("../services/api")

async function extrato() {
  let qtd = document.getElementById("quatidade")

  const response = await api.get(
    sessionStorage.getItem("url") +
      sessionStorage.getItem("numeroDaConta") +
      "/" +
      "extrato",
    {
      senha: sessionStorage.getItem("senha"),
      qtd: parseInt(qtd.value)
    }
  )

  if (response.status == 200) {
    sessionStorage.setItem("extrato", JSON.stringify(response.data).extrato)
    window.location.replace("../html/visualizaExtrato.html")
  } else {
    alert(response.data.mensagem)
  }
}
