function enviarMensagem(){
    const mensagem = document.querySelector("input").value;
    let feedMsg = document.querySelector("ul"); 
    
    feedMsg.innerHTML +=` <li>${mensagem} </li>`
}