// Aguarde a página estar totalmente carregada
document.addEventListener("DOMContentLoaded", function() {
    // Obtém referências aos elementos HTML
    const cep = document.getElementById("cep");
    const rua = document.getElementById("rua");
    const bairro = document.getElementById("bairro");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");

    // Função para consultar o CEP
    function consultaCEP() {
        if (cep.value !== "") {
            const url = "https://viacep.com.br/ws/" + cep.value + "/json/";
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        rua.value = data.logradouro;
                        bairro.value = data.bairro;
                        cidade.value = data.localidade;
                        estado.value = data.uf;
                    }
                })
                .catch(error => {
                    console.error('Erro na consulta de CEP:', error);
                });
        }
    }

    function verificarCEPVazio() {
        if (cep.value === "") {
            console.log("CEP vazio!");
            rua.value = '';
            bairro.value = '';
            cidade.value = '';
            estado.value = '';
        }
    }

    // Adicione os eventos focusout e input para o campo de CEP
    cep.addEventListener("focusout", consultaCEP);
    cep.addEventListener("input", verificarCEPVazio);

    // Verifica se o campo de CEP não está vazio e chama a função consultaCEP
    if (cep.value !== "") {
        consultaCEP();
    }
});

function cadastrarGaragem() {
    const nome = document.getElementById("nome");
    const sobrenome = document.getElementById("sobrenome");
    const cep = document.getElementById("cep");
    const rua = document.getElementById("rua");
    const numero = document.getElementById("numero");
    const complemento = document.getElementById("complemento");
    const bairro = document.getElementById("bairro");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");
    if(nome.value === '' || sobrenome.value === '' || cep.value === '' || numero.value === ''){
        alert("Preencha todos os campos do cadastro.")
        return
    }else{
        let lat
        let lng
        function converterEderecoParaCoordenadas () {
            const endereco = `${rua.value}, ${numero.value}, '-' ${bairro.value}, ${cidade.value}, '-',${estado.value}, ${cep.value} `;
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
        
            fetch(url)
            .then(response => response.json())
            .then(result => {
                if(result.length > 0) {
                    let latitude = parseFloat(result[0].lat)
                    let longitude = parseFloat(result[0].lon)
                    lat = latitude
                    lng = longitude
                }else{
                    console.log("Endereço não encontrado")
                }
            });
        };
        converterEderecoParaCoordenadas();
        let garagem = {
            usuario: '',
            nome: nome.value,
            sobrenome: sobrenome.value,
            rua: rua.value,
            numero: numero.value,
            complemento: complemento.value,
            bairro: bairro.value,
            cidade: cidade.value,
            estado: estado.value,
            cep: cep.value,
            coordenadas: {
                latitude: lat, 
                longitude: lng
            }
        }
        garagens.push(garagem);
        nome.value = '';
        sobrenome.value = '';
        cep.value = '';
        rua.value = '';
        numero.value = '';
        complemento.value = '';
        bairro.value = '';
        cidade.value = '';
        estado.value = '';
    }
}
function cadastraUsuario(){
    const user = document.getElementById("userCad").value
    const password = document.getElementById("passwordCad").value
    const confirm = document.getElementById("passwordConfirm").value
  
    if(password === confirm){
      const usuarioExistente = usuarios.some((cliente) => cliente.email === user)
    
    if(usuarioExistente) {
      alert("Usuario já cadastrado!")
    } else {
        let id = usuarios.length + 1
        const cliente = 
        {
            id: id,
            email:user, 
            senha:password
        }
        usuarios.push(cliente)
        alert("Usuário cadastrado com sucesso!")
        document.getElementById("userCad").value = ""
        document.getElementById("passwordCad").value = ""
        document.getElementById("passwordConfirm").value = ""
        }
    }else{
      alert("As senhas não coincidem!")
    }
  }