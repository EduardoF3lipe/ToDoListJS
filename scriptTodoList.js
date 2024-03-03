//captura os elementos
let buttonElement = document.querySelector('#wrapper button');
let inputElement = document.querySelector('#wrapper input');
let listElement = document.querySelector('#wrapper ul');



// busca no localstore se houver algo salvo, caso não, cria uma lista em branco.
let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || [];


//funcao para renderizar na tela o que foi adicionado no input
function showTarefas (){
    //zera o campo ul no html, se ele tiver algo já feito.
    listElement.innerHTML = "";

    //funcao anonima map que irá percorrer a nossa lista de tarefas array
    tarefas.map((todo) => {
        //1°variavel - cria um elemento de lista "LI"
        let liElement = document.createElement("li");

        //2°variavel - cria um texto que irá receber o que for inserido no input
        let tarefaText = document.createTextNode(todo);

        //3°variavel - cria uma tag "a" que será usada para excluir       
        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#"); //setando o atributo do elemento a

        //4°variavel - cria uma tag "a" que será usada para excluir
        let linkText = document.createTextNode("❌");


        let LinkEdit = document.createTextNode("📋");
       

        //variavel que irá receber a posicao
        let posicao = tarefas.indexOf(todo);

        //1 appendChild - cria o "li" dentro da ul
        listElement.appendChild(liElement);
        //2 appendChild - cria o texto que irá dentro do "li"
        liElement.appendChild(tarefaText);
         //3 appendChild - cria o elemento a que será colocado dentro do li
        liElement.appendChild(linkElement);
        //4 appendChild - cria o texto do "a" que será colocado dentro da tag link
        linkElement.appendChild(linkText);

        //seta o atributo onlick no botao de excluir e passamos o deletar tarefas como onlick
        linkElement.setAttribute("onclick" , `deletarTarefas(${posicao})`);
    })

}

showTarefas();

//função para validar se é vazio o campo caso não, ele irá seguir com o processo
function addTarefas() {
    if(!inputElement.value){
        alert('você precisa adicionar algo para continuar...');
        return false;
    } else {
        //variavel para guardar o que foi digitado
        let novaTarefa = inputElement.value;

        //limpa o campo input assim que adicionar
        inputElement.value = '';

        //pega a lista tarefas e adiciona uma nova que foi salva na variavel novaTarefa vinda do input
        tarefas.push(novaTarefa);
    
        //chama a função showTarefas
        showTarefas();
        salvarDados();
    }
}

//funcao para excluir
function deletarTarefas(posicao){
    tarefas.splice(posicao, 1);
    showTarefas();
    salvarDados();
}


function salvarDados(){
    localStorage.setItem("@listaTarefas", JSON.stringify(tarefas));
}