'use strict';

// Função que busca imagens na API
async function buscarImagens(raca) {
  const url = `https://dog.ceo/api/breed/${raca}/images`;
  const response = await fetch(url);
  const imagens = await response.json();

  if (imagens.status !== "success") {
    alert("Raça não encontrada. Tente novamente!");
    return [];
  }

  return imagens.message; 
}

// Pega elementos da página
const input = document.getElementById('procurar');
const button = document.getElementById('botao');
const galeria = document.getElementById('galeria');


async function enviarDados() {
  const text = input.value.toLowerCase().trim(); // pega raça digitada
  if (!text) return;

  galeria.innerHTML = "<p>Carregando imagens...</p>";

  const imagens = await buscarImagens(text);

  galeria.innerHTML = "";
  imagens.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    galeria.appendChild(img);
  });

  input.value = ''; 
}
button.addEventListener('click', enviarDados);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    enviarDados();
  }
});
 
