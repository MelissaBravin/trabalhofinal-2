window.onload = () => {//mapeando a serviceWorker
    "use strict";   
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
    bd()
};

async function bd(){
    const response = await fetch("http://localhost:3000/produtos")
    const data = await response.json();
    const listar = document.getElementById("listar");
    console.log(listar)
    data.map((produtos) =>{
        listar.innerHTML += `<div>${produtos.id} ${produtos.nome} ${produtos.preco} ${produtos.descricao} ${produtos.imagem}</div>`
    })
}

let posicaoInicial;//variavel para capturar a posicao
const capturarLocalizacao = document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const map = document.getElementById('mapa');

const sucesso = (posicao) => {//callback de sucesso para captura da posicao
    posicaoInicial = posicao;
    latitude.innerHTML = posicaoInicial.coords.latitude;
    longitude.innerHTML = posicaoInicial.coords.longitude;
};

const erro = (error) => {//callback de error (falha para captura de localizacao)
    let errorMessage;
    switch(error.code){
        case 0:
            errorMessage = "Erro desconhecido"
        break;
        case 1:
            errorMessage = "Permissão negada!"
        break;
        case 2:
            errorMessage = "Captura de posição indisponível!"
        break;
        case 3:
            errorMessage = "Tempo de solicitação excedido!" 
        break;
    }
    console.log('Ocorreu um erro: ' + errorMessage);
};

capturarLocalizacao.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(sucesso, erro);

    map.src = "http://maps.google.com/maps?q="+ posicaoInicial.coords.latitude+"," + posicaoInicial.coords.longitude +"&z=16&output=embed"

});