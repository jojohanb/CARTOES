// DECLARAÇÃO DAS VARIÁVEIS
const input = document.getElementById("input");
const botao = document.getElementById("botao");
const cartoesContainer = document.getElementById("cartoes-container");
const usuariosPesquisados = [];

// FUNÇÕES
botao.addEventListener("click", () => {
    const usuario = input.value.trim();
    if (usuario === "") {
        alert("Digite um usuário válido!!");
        return;
    }

    if (usuariosPesquisados.includes(usuario.toLowerCase())) {
        alert("Usuário já foi pesquisado!");
        return;
    }

    fetch(`https://api.github.com/users/${usuario}`)
        .then(response => {
            if (!response.ok) { //aqui vai verificar se a respsota da api é bem sucedida
                alert("Usuário não encontrado!");
                return;
            }
            return response.json(); //aqui esta convertendo a respsota pra json
        })
        .then(dados => {
            if (!dados) return;

            usuariosPesquisados.push(usuario.toLowerCase());

            const cartao = document.createElement("div");
            cartao.classList.add("flex", "flex-col", "items-center", "border-gray-100", "border-2", "w-72", "h-96", "bg-white", "shadow-xl", "rounded-lg", "mt-32");
            cartao.innerHTML = `
                <img class="border-2 rounded-tl-md rounded-tr-md h-32 w-full" src="/src/forest-landscape-clouds-4k-xn-1920x1080.jpg" alt="">
                <img class="rounded-full w-20 h-20 border-4 border-white absolute top-72 " src="${dados.avatar_url}" alt="">
                <h2 class="mt-10">${dados.name || "Nome não disponível"}</h2>
                <p class="text-slate-400 text-xs">@${dados.login}</p>
                <div class="ml-4 w-full">
                    <div class="flex justify-between items-center">
                        <h2 class="font-bold text-lg text-left">Repositórios</h2>
                    </div>
                    <div class="mt-2 h-40 overflow-y-scroll border border-gray-200 p-2" id="lista-repositorios-${dados.login}">
                    </div>
                </div>
            `;
            cartoesContainer.appendChild(cartao);

            const listaRepositorios = document.getElementById(`lista-repositorios-${dados.login}`);
            fetch(`https://api.github.com/users/${usuario}/repos`)
                .then(response => response.json()) //aqui converte a resposta para json
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
            alert("Erro ao buscar dados do usuário.");
            console.error(error);
        });
});
