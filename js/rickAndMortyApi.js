//constante que guarda la ruta de la API
const API_ALBUM = "https://rickandmortyapi.com/api/character";

//primera función, utilizando un método de js para consumir la api (fetch)
function getAlbum(api) {
    //fetch me devuelve una promesa, y en el then yo resulevo la promesa
    fetch(api).then((response) => response.json()) //Me transforma la respuesta a la APi en un objeto js
    //Para que la solicitud sea exitosa
    .then((json) => {        
        fillData(json.results)//
        pagination(json.info);
    })

    //Para cuando falle la promesa
    .catch(function(error) {
        console.log(error, "Error consumiendo la API");
    })
}

function fillData(results) {
let cards = "";
for (let i = 0; i < 20; i++){
//template string ``
cards +=  `<div class= "col">
<div class= "card h-100" style= "width: 12rem;">
<img src="${results[i].image}" class="card-img-top" alt="img-personaje">
<h2 class="card-title" > ${results[i].name} </h2>
<div class="card-body">
<h5 class="card-title">Status: ${results[i].status}</h5>
<h5 class="card-title">Species: ${results[i].species}</h5>
</div>
</div>
</div>
`
}
document.getElementById("dataAlbum").innerHTML = cards;

}

function pagination(info){

let prevDisabled = "";
let nextDisabled = "";

if(!info.prev) {
    prevDisabled = "disabled";
}
if (!info.next) {
    nextDisabled = "disabled";
    
}

let html = `
  <li class="page-item ${prevDisabled}"><a  class="page-link" onclick="getAlbum('${info.prev}')" >prev</a></li>
  <li class="page-item ${nextDisabled}"><a  class="page-link" onclick="getAlbum('${info.next}')" >next</a></li>
  `;

  document.getElementById("pagination").innerHTML = html;
}

//Invoca el metodo para que se ejecute
getAlbum(API_ALBUM)
