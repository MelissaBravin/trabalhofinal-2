let url = `https://worrisome-tan-crown.cyclic.app/produtos`;

// window.onload = () => {//mapeando a serviceWorker
//     "use strict";   
//     if("serviceWorker" in navigator){
//         navigator.serviceWorker.register("./sw.js");
//     }
//     bd()
// };

bd()
async function bd(){
    const response = await fetch(url)
    const data = await response.json();
    var listar = document.getElementById("listar");
    console.log(listar)
    data.map((produtos) =>{
        listar.innerHTML += `<div id="card-produtos"><span>${produtos.id} </span><span class='nome'>${produtos.nome} </span><span id='preco'>${produtos.preco} reais</span><span>${produtos.descricao}</span>   <img width="300" height="200" class="imagem" src=${produtos.imagem}/></div>`
    })
}

let posicaoInicial;//variavel para capturar a posicao
const capturarLocalizacao = document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const map = document.getElementById('map');

function atualizarMapa(){
    map.src = "http://maps.google.com/maps?q="+ posicaoInicial.coords.latitude + "," + posicaoInicial.coords.longitude +"&z=16&output=embed"
}

const sucesso = (posicao) => {//callback de sucesso para captura da posicao
    posicaoInicial = posicao;
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
   setInterval( atualizarMapa(), 3000)

});