let latitudeDoUsuario;
let longitudeDoUsuario;
let map;

function obterLatitudeDoUsuario() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitudeDoUsuario = position.coords.latitude;
            longitudeDoUsuario = position.coords.longitude;
            console.log('Latitude do usuário:', latitudeDoUsuario);
            console.log('Longitude do usuário:', longitudeDoUsuario);
            criarMapa();
        }, function(error) {
            console.log('Erro ao obter a geolocalização:', error);
        });
    } else {
        console.log('Geolocalização não suportada pelo navegador.');
    }
}

function criarMapa() {
    map = L.map('map').setView([latitudeDoUsuario, longitudeDoUsuario], 18);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    for(let i = 0; i < garagens.length; i++) {
        L.marker([garagens[i].coordenadas.latitude, garagens[i].coordenadas.longitude]).addTo(map)
    }
}

function atualizarMarcadoresNoMapa() {
    if (!map) return;

    // Limpar marcadores existentes
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Adicionar marcadores das garagens
    for (let i = 0; i < garagens.length; i++) {
        L.marker([garagens[i].coordenadas.latitude, garagens[i].coordenadas.longitude]).addTo(map);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    obterLatitudeDoUsuario();
});
























function converterEderecoParaCoordenadas () {
    const endereco = `${enderecos[0].rua}, ${enderecos[0].numero}, '-' ${enderecos[0].bairro}, ${enderecos[0].cidade}, '-',${enderecos[0].estado}, ${enderecos[0].cep} `
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`

    fetch(url)
    .then(response => response.json())
    .then(result => {
        if(result.length > 0) {
            let latitude = parseFloat(result[0].lat)
            let longitude = parseFloat(result[0].lon)
            console.log('Latitude: ', latitude, 'Longitude: ', longitude)
            enderecos[0].coordenadas.latitude = latitude
            enderecos[0].coordenadas.longitude = longitude
            console.log(enderecos)
            marker.setLatLng([latitude, longitude])
        }else{
            console.log("Endereço não encontrado")
        }
    })
    .catch(error => {
        console.log("Erro ao converter o endereço: ", error)
    })
}

