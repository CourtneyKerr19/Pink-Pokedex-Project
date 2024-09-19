document.addEventListener("DOMContentLoaded", () => {
  const localApiUrl = "http://localhost:3000/pokemon";
  const pokeApiUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";
  const pokemonContainer = document.getElementById("cards-container");
  const searchInput = document.getElementById('search');

  // Fetch Pokemon from PokeApi and json-server
  function fetchPokemon() {
    //Fetch from json-server
    fetch(localApiUrl)
      .then(response => response.json())
      .then(localPokemon => {
        //Fetch from PokeApi
        fetch(PokeApiUrl)
          .then(response => response.json())
          .then(apiData => {
            const apiPokemonList = apiData.results;

            //Merge local json-server data and PokeApi data
            const combinedPokemon = [...localPokemon, ...apiPokemonList];
            renderedPokemonCards(combinedPokemon)
          });
      })
      .catch(error => console.error("Error fetching Pokémon:", error));
  }

  //Render Pokemon Cards
  function renderPokemonCards(pokemonList) {
    pokemonContainer.innerHTML = "";
    pokemonList.forEach(pokemon => {
      //If the Pokemon is from PokeApi, fetch additional details
      if(pokemon.url) {
        fetchPokemonDetailsFromApi(pokemon.url);
      } else {
        renderLocalPokemon(pokemon);
      }
    });
  }

  // Function to render Pokémon from json-server
  function renderLocalPokemon(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'pokemon-card';
    pokemonCard.innerHTML = `
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p>Height: ${pokemon.height}</p>
      <p>Weight: ${pokemon.weight}</p>
    `;
    pokemonContainer.appendChild(pokemonCard);
  }

  // Fetch additional details for Pokémon from PokeAPI
  function fetchPokemonDetailsFromAPI(apiUrl) {
    fetch(apiUrl)
      .then(response => response.json())
      .then(pokemonData => {
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemon-card';
        pokemonCard.innerHTML = `
          <h2>${pokemonData.name}</h2>
          <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
          <p>Height: ${pokemonData.height}</p>
          <p>Weight: ${pokemonData.weight}</p>
        `;
        pokemonContainer.appendChild(pokemonCard);
      })
      .catch(error => console.error('Error fetching Pokémon from API:', error));
  }

  // Implement search functionality
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

  // Fetch Pokémon on page load
  fetchPokemon();
});