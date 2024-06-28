const input= document.getElementById("input").value;
const botao= document.getElementById("botao");

botao.addEventListener("click", validar, pesquisar )

function validar(){
    const validando= input.value
    if (validando ==""){
        alert("Digite um usuário válido!!")
    }
}

function pesquisar(){
    if (input) {
        fetch(`https://api.github.com/users/${input}`) //aqui esta 
        .then(response => response.json()) //pegando em forma de obj
        // .then(dados =>)

    }


}



// function validar(){
//     if (input ==" "){
//         alert("Digite um usuário valido!")
//     } 
// }