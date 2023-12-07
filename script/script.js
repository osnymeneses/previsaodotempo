let pHora = document.querySelector('.hora');
let saudacao = document.querySelector('.saudacao');

//data
let data = new Date();
let ano = data.getFullYear();
let mes = data.getMonth() + 1;
mes = mes < 10 ? '0' + mes : mes;
let dia = data.getDate();
dia = dia < 10 ? '0' + dia : dia;

// hora
let hora = data.getHours();
let minutos = data.getMinutes();
let segundos = data.getSeconds();

let pData = document.querySelector('.data');
pData.textContent = `${dia}/${mes}/${ano}`;

// atualiza hora + acrescimo de zero a esquerda
let intervalo = setInterval(relogio,1000);
function relogio() {
    let data = new Date();
    let h = data.getHours();
    h = h < 10 ? '0' + h : h;
    let m = data.getMinutes();
    m = m < 10 ? '0' + m : m;
    let s = data.getSeconds();
    s = s < 10 ? '0' + s : s;
 
    pHora.innerHTML = `${h}:${m}:${s}`;
}


// Executa quando a página é carregada
window.addEventListener('load', () => {
    let imgFundo = document.querySelector('#img-fundo-id');

    if(hora >= 6 && hora < 12) {
        imgFundo.classList.add('img-manha-dois');
        saudacao.textContent = 'Bom dia!';
    } else if(hora >= 12 && hora < 18) {
        imgFundo.classList.add('ceu_tarde_um');
        saudacao.textContent = 'Boa tarde!';
    } else if(hora >= 18 && hora <= 23) {
        imgFundo.classList.add('ceu_noite_um');
        saudacao.textContent = 'Boa noite!';
    } else {
        imgFundo.classList.add('madrugada');
        saudacao.textContent = 'Boa Madrugada!';
    }
    
})

const key = "6710aed1d9c2a7371fd973eee8125c4b";

let botao = document.querySelector("#btn");
botao.addEventListener("click", pesquisa);

document.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        botao.click();
    }
})


let nomeCidade = document.querySelector("#cidade");
let graus = document.querySelector("#graus");
let imagemTempo = document.querySelector("#imagem-tempo");
let condicoesTempo = document.querySelector("#condicoes-tempo");
let umidade = document.querySelector("#umidade");
let imgBandeira = document.querySelector("#bandeira-pais");
let msgErro = document.querySelector("#erro");
let centerInfo = document.querySelector("#center-info")

document.querySelector("#input-dados").addEventListener("keypress", (e) => {
    let keycode = (e.keycode ? e.keycode : e.which);
    if(keycode >= 48 && keycode <= 57) {
        e.preventDefault();
    }
});


function imprimirDados(dadosApi) {
    nomeCidade.textContent =`Tempo em ${dadosApi.name} |`;
    graus.textContent =`${Math.floor(dadosApi.main.temp)}°C`;
    condicoesTempo.textContent = dadosApi.weather[0].description;
    umidade.textContent = `Umidade do ar: ${dadosApi.main.humidity}%`;
    imagemTempo.src = `https://openweathermap.org/img/wn/${dadosApi.weather[0].icon}.png`;
    imagemTempo.style.display = "block";
    imgBandeira.src = `https://countryflagsapi.netlify.app/flag/${dadosApi.sys.country}.svg`;
    imgBandeira.style.display = "block";
}

async function dadosPesquisa(inputDados){
   let dadosApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputDados}&appid=${key}&lang=pt_br&units=metric`)
    .then(response => {
        if(response.status == "404") {
            erro();
        } else {
            infoErro();
        }
        return response.json()
    });

    imprimirDados(dadosApi);
    
   
}

function limparCampo() {
    document.querySelector("#input-dados").value = "";
}

function pesquisa() {
    inputDados = document.querySelector("#input-dados").value;
    dadosPesquisa(inputDados);
    limparCampo()
}

function erro() {
    msgErro.classList.remove("erro");
    centerInfo.classList.add("erro");
}

function infoErro() {
    msgErro.classList.add("erro");
    centerInfo.classList.remove("erro");
}