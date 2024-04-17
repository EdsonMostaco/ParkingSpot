function mudaForm(){
  const formLog = document.getElementById("formLog")
  const formCad = document.getElementById("formCad")

  formLog.classList.toggle("deactivaded")
  formCad.classList.toggle("deactivaded")
}

function logar(){
  const user = document.getElementById("user").value
  const password = document.getElementById("password").value

  const usuario = usuarios.find((cliente) => cliente.email === user && cliente.senha === password)

  if(usuario){
    alert("Login realizado com sucesso!")
    window.location.href = "./home/home.html"
    document.getElementById("user").value=""
    document.getElementById("password").value=""
  }else{
    alert("Nome de usuário ou senha incorretos!")
    document.getElementById("user").value=""
    document.getElementById("password").value=""
  }
}