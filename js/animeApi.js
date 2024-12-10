const BASE_URL = `https://api.jikan.moe/v4`;
const form = document.getElementById("searchForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.getElementById("searchInput").value;
  const api = `${BASE_URL}/anime?q=${query}`;
  getAnime(api);
});

//primera funcion
const getAnime = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      dataRender(data.data);
      console.log(data.data);
    })
    .catch((error) => console.error("Error:", error));
};

const dataRender = (animes) => {
  if (animes.length === 0) {
    document.querySelector(".dataAlbum").innerHTML =
      "<h2>No characters found</h2>";
    return;
  }
  const animesContainer = document.querySelector(".dataAlbum");
  const animesRendering = animes.map(
    (anime) =>
      `<div class="col">
            <div class="card h-100" style="width: 12rem;">
                <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="img-anime">
                <h2 class="card-title">${anime.titles[0].title}</h2>
                <div class="card-body">
                    <h5 class="card-title">Status: ${anime.status}</h5>
                    <h5 class="card-title">Episodes: ${anime.episodes}</h5>
                </div>
            </div>
        </div>`
  );

  animesContainer.innerHTML = animesRendering.join("");
};
