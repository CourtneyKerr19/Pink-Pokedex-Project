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

            //Add Event Listener to Pokemon Card
            pokemonCard.addEventListener('click', () => {
              alert(`More details about ${pokemonData.name}`);
            });
          }); 
      });
    });
});   

//Implementing a Search Feature
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search Pokemon...';
document.body.insertBefore(searchInput, pokemonContainer);

searchInput.addEventListener('input', (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const pokemonCards = document.querySelectorAll('.pokemon-card');
  pokemonCards.forEach(card => {
    const pokemonName = card.querySelector('h2').textContent.toLowerCase();
    if (pokemonName.includes(searchTerm)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
 }); 
 