
//As funções só serão carregadas depois de todos os elementos HTML forem carregados
window.addEventListener('load', start);

//Variáveis Globais;
var globalNames = ['Lucas', 'Luciana', 'Luciene', 'Julia']
var inputName = null;
var currentIndex = null;
var isEditing = false;

//Funções que já serão carregadas ao iniciar a página;
function start() {
    inputName = document.querySelector('#inputName');
    preventFormSubmit();
    activateInput();
    render();
}

//Previne que a página faça o submit sozinha
function preventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit)
}

//Função para ativar o Focus 
function activateInput() {
    //Aqui inserimos no nosso vetor GlobalNames, o evento;
    function insertName(newName) {
        globalNames.push(newName);

        render();
    }

    //Atualiza o Name;
    function updateName(newName) {
        globalNames[currentIndex] = newName;
    }

    //Pegamos o evento do teclado (Enter) e inserimos no vetor acima;
    function handleTyping(event) {
        if(event.key === 'Enter' && event.target.value.trim() != ''){
            if(isEditing){
                updateName(event.target.value);
            }
            else{
                insertName(event.target.value);
            }

            isEditing = false;
        }
    }
    render()

    //Pegando o evento do teclado
    inputName.addEventListener('keyup', handleTyping)
    inputName.focus();
}

function render() {
    var divNames = document.querySelector('#names');
    
    //Criamos a função para deletar o button;
    function createDeleteButton(index) {
        function deleteName(){
            //O splice remove o elemento do array e se necessário, coloca um novo elemento no lugar;
            globalNames.splice(index, 1);
            render();
        }

        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'x';

        button.addEventListener('click', deleteName)

        return button;
    }

    //Criamos um SPAN onde inserimos uma classe e nela podemos editar;
    function createSpan(name) {
        function editItem() {
            inputName.value = name;
            inputName.focus();
            isEditing = true;
        }
        var span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click', editItem);

        return span;
    }
    //Aqui limpamos o nosso vetor e adicionamos o valor que foi colocado no input
    divNames.innerHTML = '';

    //Cria o Elemento ul;
    var ul = document.createElement('ul');

    //Pra cada elemento que eu for adicionando, ele cria o elemento 'li' e incrementa na ul;
    for(var i = 0; i < globalNames.length; i++) {
        var currentName = globalNames[i];

        var li = document.createElement('li');
        var button = createDeleteButton(i);

        var span = createSpan(currentName);

        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);
    }

    //Adiciono os nomes na ul;
    divNames.appendChild(ul);

    clearInput();
}


function clearInput() {
    //Aqui substituimos o valor do input para vazio e depois focamos com focus;
    inputName.value = '';
    inputName.focus();
}
