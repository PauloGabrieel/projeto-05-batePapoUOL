let nomeUsuario;
let mensagens =[];
function logar(){
    
    const container = document.querySelector(".container");
    const telaDeLogin = document.querySelector(".tela-de-login");
    nomeUsuario = document.querySelector(".tela-de-login input").value;

    telaDeLogin.classList.add("esconder");
    container.classList.remove("esconder");
    entrarNoChat();
}

// const perguntaNomeUsuario = prompt("Olá, qual é seu nome ?"); 
// const usuario = {name: perguntaNomeUsuario};




function entrarNoChat(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants" , {
        name: nomeUsuario
    });

    promise.then(tratarSucesso);
    promise.catch(tratarError);
    
}


function tratarError(error){
       
    if(error.response.status == 400){
        alert("Nome de usuário já cadastrado, escolha outro nome.");
        window.location.reload();   
    }
}

function tratarSucesso(response){
    statusConexao();
    buscarMensagens();

}
function statusConexao(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {name: nomeUsuario});
    promise.then(function(){setTimeout(statusConexao,4000)});
    promise.catch(errorManterConexao);
    
}


function errorManterConexao(error){
    console.log(error)
}
function buscarMensagens(){
    
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(carregarMensagems)
    promise.catch(tratarErrorMensagens)
    
}

function carregarMensagems(response){
    mensagens = response.data;
    renderizarMensagens();

}

function renderizarMensagens(){
    const ulMensagens = document.querySelector('ul');
    


    for(let index =0; index < mensagens.length;index++){
        if( mensagens[index].type == "status"){
    
            ulMensagens.innerHTML += `
                <li class="status">
                    <div class="horario">${mensagens[index].time}</div>
                    <div class="remetente">${mensagens[index].from}</div> para 
                    <div class="destinatario">${mensagens[index].to}:</div> 
                    <div class="texto">${mensagens[index].text}</div>
                </li>
        `
        }else if(mensagens[index].type == "private-message"){
            ulMensagens.innerHTML += `
                <li class="private-message>
                    <div class="horario">${mensagens[index].time}</div>
                    <div class="remetente">${mensagens[index].from}</div> para 
                    <div class="destinatario">${mensagens[index].to}:</div> 
                    <div class="texto">${mensagens[index].text}</div>
                </li>
        `
        }else{
            ulMensagens.innerHTML += `
            <li class="private-message>
                <div class="horario">${mensagens[index].time}</div>
                <div class="remetente">${mensagens[index].from}</div> para 
                <div class="destinatario">${mensagens[index].to}:</div> 
                <div class="texto">${mensagens[index].text}</div>
            </li>
    `
        }
    }
    ulMensagens.scrollIntoView({block: "end", behavior: "smooth"});
    setTimeout(buscarMensagens,10000);

    
}    

function tratarErrorMensagens(error){

    console.log(error.response);

}

function enviarMensagem(){
    let mensagem = document.querySelector("footer input").value;

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", {
        from: nomeUsuario,
        to: "todos",
        text: mensagem,
        type: "message"
    });
    promise.then(buscarMensagens);
    promise.catch(tratarErroEnvioMsg);
}

function tratarErroEnvioMsg(){

}


// entrarNoChat();
// buscarMensagens();

// promise.then(EntrarNoChat)
// function EntrarNoChat(){



// function enviarMensagem(){
//     const mensagem = document.querySelector("input").value;
//     let feedMsg = document.querySelector("ul"); 
    
//     feedMsg.innerHTML +=` 
