window.onload = initPage

function initPage() {
  let corpo = document.getElementById("conteudo")
  corpo.innerText = sessionStorage.getItem("extrato")
}
