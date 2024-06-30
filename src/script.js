// DECLARACAO DAS VARIAVEIS
const input = document.getElementById("input");
const botao = document.getElementById("botao");
const cartao = document.getElementById("cartao");
const avatar = document.getElementById("avatar");
const nome = document.getElementById("nome");
const username = document.getElementById("username");
const listaRepositorios = document.getElementById("lista-repositorios");
const verMais = document.getElementById("ver-mais");

// FUNCOES
botao.addEventListener("click", () => {
    const usuario = input.value.trim();
    if (usuario === "") {
        alert("Digite um usuário válido!!");
        return;
    }

    fetch(`https://api.github.com/users/${usuario}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Usuário não encontrado!");
            }
            return response.json();
        })
        .then(dados => {
            cartao.classList.remove("hidden");
            avatar.src = dados.avatar_url;
            nome.textContent = dados.name || "Nome não disponível";
            username.textContent = `@${dados.login}`;

            listaRepositorios.innerHTML = "";
            fetch(`https://api.github.com/users/${usuario}/repos`)
                .then(response => response.json())
                .then(repos => {
                    repos.forEach(repo => {
                        const repoDiv = document.createElement("div");
                        repoDiv.classList.add("bg-slate-100", "border-2", "p-2", "rounded-lg", "mb-2");
                        repoDiv.innerHTML = `
                            <h3 class="font-bold">${repo.name}</h3>
                            <p class="text-slate-400 text-xs">${repo.description || ''}</p>
                            <button class="font-bold bg-slate-200 w-16 rounded-lg">#${repo.language || 'N/A'}</button>
                        `;
                        listaRepositorios.appendChild(repoDiv);
                    });
                })
                .catch(error => {
                    console.error("Erro ao buscar repositórios:", error);
                });
        })
        .catch(error => {
            alert(error.message);
            cartao.classList.add("hidden");
        });
});

verMais.addEventListener("click", () => {
    listaRepositorios.classList.toggle("hidden");
    verMais.textContent = listaRepositorios.classList.contains("hidden") ? "Ver mais" : "Ver menos";
});

// function pesquisar(){
//     if (input) {
//         fetch(`https://api.github.com/users/${input}`) //aqui esta 
//         .then(response => response.json()) //pegando em forma de obj
//         // .then(dados =>)

//     }

// }



