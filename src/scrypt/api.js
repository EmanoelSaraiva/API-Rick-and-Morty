window.onload = () => {
  mostrarPersonagens();
};

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});
