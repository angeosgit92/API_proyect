const API_ENDPOINT = "https://pokeapi.co/api/v2/pokemon?limit=60&offset=0";

const getPokemons = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      const pokemonPromises = data.results.map((pokemon) =>
        fetch(pokemon.url).then((response) => response.json())
      );
      Promise.all(pokemonPromises)
        .then((pokemons) => {
          dataRender(pokemons);
          console.log(pokemons);
          pagination(data);
        })
        .catch((error) =>
          console.error("Error fetching Pokémon details:", error)
        );
    })
    .catch((error) => console.error("Error fetching Pokémon list:", error));
};

const dataRender = (pokemons) => {
  const charactersContainer = document.querySelector(".dataAlbum");
  if (!charactersContainer) {
    console.error("Characters container not found");
    return;
  }
  const charactersRendering = pokemons.map(
    (pokemon) =>
      `<div class= "col">
    <div class= "card h-100" style= "width: 12rem;">
    <img src="${
      pokemon.sprites.front_default
    }" class="card-img-top" alt="img-personaje">
    <h2 class="card-title" > ${pokemon.name} </h2>
    <div class="card-body">
    <h5 class="card-title">Abilities:</h5>
    <ul>
        ${pokemon.abilities
          .map((ability) => `<li>${ability.ability.name}</li>`)
          .join("")}
    </ul>
    <h5 class="card-title">Species: ${pokemon.species.name}</h5>
    </div>
    </div>
    </div>
    `
  );
  charactersContainer.innerHTML = charactersRendering.join("");
};

const pagination = (data) => {
  let prevIsDisabled = data.previous ? "" : "disabled";
  let nextIsDisabled = data.next ? "" : "disabled";
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = `
    <li class="page-item ${prevIsDisabled}">
        <a class="page-link" href="#" onclick="getPokemons('${data.previous}')">Previous</a>
    </li>
    <li class="page-item ${nextIsDisabled}">
        <a class="page-link" href="#" onclick="getPokemons('${data.next}')">Next</a>
    </li>
    `;
};

// Call the function to fetch and render Pokémons
getPokemons(API_ENDPOINT);
