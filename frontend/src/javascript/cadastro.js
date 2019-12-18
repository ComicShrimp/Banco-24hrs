function verificaCampos() {
  senha = document.getElementById("senha")
  senha2 = document.getElementById("senha2")

  if (senha.value != senha2.value) {
    alert("As senhas devem ser iguais")
  }
}
