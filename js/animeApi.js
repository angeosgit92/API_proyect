const BASE_URL = `https://api.jikan.moe/v4`;
const ITEMS_PER_PAGE = 20;
let currentPage = 1;
let currentQuery = "";

const form = document.getElementById("searchForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.getElementById("searchInput").value;
  currentQuery = query;
  currentPage = 1; // Reset to the first page for a new search
  const api = `${BASE_URL}/anime?q=${query}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`;
  getAnime(api);
});

// Function to fetch and render anime data
const getAnime = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      if (data.data) {
        dataRender(data.data);
        pagination(data.pagination);
        console.log(data.data);
      } else {
        console.error("No data returned by API");
      }
    })
    .catch((error) => console.error("Error:", error));
};

const dataRender = (animes) => {
  const animesContainer = document.querySelector(".dataAlbum");
  if (animes.length === 0) {
    animesContainer.innerHTML = "<h2>No anime found</h2>";
    return;
  }
  const animesRendering = animes.map(
    (anime) =>
      `<div class="col">
        <div class="card h-100" style="width: 12rem;">
          <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="img-anime">
          <h2 class="card-title">${anime.titles[0].title}</h2>
          <div class="card-body">
            <h5 class="card-title">Episodes: ${anime.episodes}</h5>
            <a href="${anime.url}" target="_blank" class="btn btn-primary">View Anime</a>
          </div>
        </div>
      </div>`
  );

  animesContainer.innerHTML = animesRendering.join("");
};

const pagination = (paginationData) => {
  const paginationContainer = document.querySelector(".pagination");
  const prevIsDisabled = paginationData.current_page === 1 ? "disabled" : "";
  const nextIsDisabled = paginationData.has_next_page ? "" : "disabled";

  paginationContainer.innerHTML = `
    <li class="page-item ${prevIsDisabled}">
      <a class="page-link" href="#" onclick="changePage(-1)">Previous</a>
    </li>
    <li class="page-item ${nextIsDisabled}">
      <a class="page-link" href="#" onclick="changePage(1)">Next</a>
    </li>
  `;
};

const changePage = (direction) => {
  currentPage += direction;
  const queryParam = currentQuery ? `?q=${currentQuery}` : "";
  const api = `${BASE_URL}/anime${queryParam}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`;
  getAnime(api);
};

// Initial fetch to display popular anime on load
const initialApi = `${BASE_URL}/anime?page=${currentPage}&limit=${ITEMS_PER_PAGE}`;
getAnime(initialApi);
