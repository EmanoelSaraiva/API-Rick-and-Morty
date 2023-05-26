window.onload = () => {
  contadorRodade();
  mostrarPersonagens();
};

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

let paginaAtual = 1;

function mostrarPersonagens() {
  api.get("/character").then((res) => {
    const personagens = res.data.results;
    const informacoes = res.data.info;
    let cards = document.getElementById("containerPersonagens");
    cards.innerHTML = "";

    personagens.forEach((personagen) => {
      cards.innerHTML += `<div  class="personagem">
      <img src="${personagen.image}" alt="">
      <div class="nomePersonagem">
          <article>
              <span>${personagen.name}</span>
          </article>
          <span>${personagen.status}</span><span>-${personagen.species}</span>
      </div>
  </div>`;
    });
  });
}

const botaoBuscar = document.getElementById("botaoBuscar");
const buscar = document.getElementById("inputBuscar");

botaoBuscar.addEventListener("click", function () {
  const textoBusca = buscar.value;
  mostrarPersonagens(paginaAtual, textoBusca);
});

buscar.addEventListener("input", function () {
  const textoBusca = buscar.value;
  mostrarPersonagens(paginaAtual, textoBusca);
});

function contadorRodade() {
  api.get("/character").then((res) => {
    const quantidadePersonagens = res.data.info.count;
    const quantidadeNoSpan = document.getElementById("quantidadePersonagens");

    quantidadeNoSpan.textContent = quantidadePersonagens;
  });

  api.get("/location").then((res) => {
    const localizacao = res.data.info.count;
    const localizacaoNoSpan = document.getElementById("localizacao");

    localizacaoNoSpan.textContent = localizacao;
  });

  api.get("/episode").then((res) => {
    const episodio = res.data.info.count;
    const episodioNoSpan = document.getElementById("episodios");

    episodioNoSpan.textContent = episodio;
  });
}
