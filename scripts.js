const perguntaNomeUsuario = prompt("Olá, qual é seu nome ?"); 
const usuario = {name: perguntaNomeUsuario};


let mensagens =[];

function entrarNoChat(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants" , usuario);

    promise.then(tratarSucesso);
    promise.catch(tratarError);
    
}


function tratarError(error){
       
    // if(error.response.status == 400){
    //     alert("Nome de usuário já cadastrado, escolha outro nome.")
        
    // }
}

function tratarSucesso(response){
    

}


function buscarMensagens(){
    
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(carregarMensagems)
    promise.catch(tratarErrorMensagens)
}

function carregarMensagems(response){
    mensagens = response.data;
    console.log(mensagens);
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
  
    setInterval(buscarMensagens,10000);
}    

function tratarErrorMensagens(error){

    console.log(error.response);

}




entrarNoChat();
buscarMensagens();

// promise.then(EntrarNoChat)
// function EntrarNoChat(){



// function enviarMensagem(){
//     const mensagem = document.querySelector("input").value;
//     let feedMsg = document.querySelector("ul"); 
    
//     feedMsg.innerHTML +=` 
