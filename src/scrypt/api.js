window.onload = () => {
  load("/character/?page=1");
  contadorRodade();
};

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

const botaoProximo = document.getElementById("botaoProximo");

let informacoes;
let proximaPagina = null;
let paginaAnterior = null;

async function renderizarPersonagem(personagen) {
  let cards = document.getElementById("containerPersonagens");

  let statusCor = "";
  let statusTexto = "";

  if (personagen.status === "Alive") {
    statusCor = "#56CD42";
    statusTexto = "Vivo";
  } else if (personagen.status === "Dead") {
    statusCor = "#CD4242";
    statusTexto = "Morto";
  } else {
    statusCor = "#BBBBBB";
    statusTexto = "Desconhecido";
  }

  const episodioNResponde = await axios.get(personagen.episode[0]);
  const episodioNome = episodioNResponde.data.name;

  cards.innerHTML += `
    <div class="personagem">
      <img src="${personagen.image}" alt="">
      <div class="nomePersonagem">
      <div class="statusPersonagem">
        <article>
          <span>${personagen.name}</span>
        </article>
        <div>
          <div class="statusCirculo" style="background-color: ${statusCor};"></div>
          <span>${statusTexto} - ${personagen.species}</span>
        </div>
      </div>
        <div>
          <p>Última localização conhecida:</p>
          <span>${personagen.location.name}</span>
        </div>
        <div>
          <p>Visto a última vez em:</p>
          <span>${episodioNome}</span>
        </div>  
      </div>
    </div>`;
}

function montar(personagensi) {
  let cards = document.getElementById("containerPersonagens");
  cards.innerHTML = "";

  personagensi.forEach((personagen) => {
    renderizarPersonagem(personagen);
  });
}

function mostrarPersonagens(res) {
  const personagens = res.results;
  informacoes = res.info;

  montar(personagens);
}

function load(url, buscar = "") {
  const buscarPersonagem = buscar ? `&name=${buscar}` : ""; // busca personagem por nome
  api.get(url + buscarPersonagem).then((res) => {
    const paginas = res.data;
    proximaPagina = res.data.info.next;
    paginaAnterior = res.data.info.prev;
    mostrarPersonagens(paginas);
  });
}

function pesquisar() {
  const buscar = buscarInput.value;
  load("/character/?page=1", buscar);
}

function mudarPagina(url) {
  if (url != null) {
    load(url);
  }
}

const buscarInput = document.getElementById("inputBuscar");

buscarInput.addEventListener("input", () => {
  pesquisar();
});

const btnAnterior = document.getElementById("botaoAnterior");
btnAnterior.addEventListener("click", () => {
  mudarPagina(paginaAnterior, buscarInput.value);
  window.scrollTo(0, 0);
});

const btnProxima = document.getElementById("botaoProximo");
btnProxima.addEventListener("click", () => {
  mudarPagina(proximaPagina, buscarInput.value);
  window.scrollTo(0, 0);
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
