//Fetch and Display Pokemon Data
document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";
  const pokemonContainer = document.getElementById("pokemon-container");

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(pokemon => {
        fetch(pokemon.url)
          .then(response => response.json())
          .then(pokemonData => {
            const pokemonCard = document.createElement('div');
            pokemonCard.className = 'pokemon-card';
            pokemonCard.innerHTML = `
              <h2>${pokemonData.name}</h2>
              <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}"/>
              <p>Height: ${pokemonData.height}</p>
              <p>Weight: ${pokemonData.weight}</p>
              `;
            pokemonContainer.appendChild(pokemonCard);
          }); 