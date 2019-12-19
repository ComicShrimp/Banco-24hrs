const api = require("../services/api")
window.onload = initPage

async function initPage() {
  let titulo = document.getElementById("titulo")
  let imagem = document.getElementById("imagem")
  let nome = document.getElementById("nome")
  let saldo = document.getElementById("saldo")
  let operacao = document.getElementById("operacao")
  let valor = document.getElementById("valor")

  const response = await api.get(
    sessionStorage.getItem("url") + sessionStorage.getItem("numeroDaConta"),
    {
      senha: sessionStorage.getItem("senha")
    }
  )

  let cliente = response.data

  titulo.innerText = "Óla " + cliente.nome
  imagem.innerHTML = `<img src="${cliente.imagem}"/>`
  nome.innerText = "Cliente: " + cliente.nome
  saldo.innerText = "Saldo: R$" + cliente.saldo
  operacao.innerText = cliente.ultimaTransacao.operacao
  valor.innerText = "Valor: " + cliente.ultimaTransacao.valor
}

function extrato() {
  window.location.replace("../html/extrato.html")
}

function saque() {
  window.location.replace("../html/saque.html")
}

function deposito() {
  window.location.replace("../html/deposito.html")
}

function trasferencia() {}
