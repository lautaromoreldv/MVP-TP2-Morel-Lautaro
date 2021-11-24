let d = document;
let db;
const url = 'https://www.omdbapi.com/?apikey=';
const API_KEY = '5c825fa0';
let buscar = d.getElementById('buscar');
let input = d.getElementById('input');
let info = d.getElementById('info');
//let mostrar = d.getElementById('mostrar');
let alert = d.getElementById('alert');
let vermastarde = d.getElementById('vermastarde');
let liVermastarde = d.getElementById('liVermastarde');
let home = d.getElementById('home');
let liHome = d.getElementById('liHome');
let buscador = d.getElementById('buscador');

liHome.addEventListener('click', () => {
    vermastarde.style.display = 'none';
    home.style.display = 'block';
    buscador.style.display = 'block';
})

liVermastarde.addEventListener('click', () => {
    home.style.display = 'none';
    vermastarde.style.display = 'block';
    buscador.style.display = 'none';
})


buscar.addEventListener('click', (e) => {
    e.preventDefault();
    if(input.value != ''){
        obtenerDato(input.value);   
    }
})

function obtenerDato(valor){
    fetch(url + API_KEY + '&t=' + valor)
        .then(response => response.json() )     
        .then(data => {
            console.log(data);
            const title = data.Title;
            const plot = data.Plot;
            const poster = data.Poster;
            const score = data.imdbRating;
            info.innerHTML = `<div class="card">
                                <img class="card-img-top" src="${poster}" alt="${title}" />
                                <div class="card-body">
                                    <h2 class="text-center">${title}</h2>
                                </div>  
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <p>Descripción:</p>
                                        <span>${plot}<span>
                                    <li class="list-group-item">
                                        <p>Calificación:</p>
                                        <span><strong>${score}/10</strong><span>
                                </ul>  
                                <div class="text-center pt-3 pb-3">
                                    <button type="button" id="porver" class="btn btn-outline-info text-center">Ver más tarde</button>
                                </div>
                            </div>`;
                                let porver = d.getElementById('porver');
                                porver.addEventListener('click', (e) => {
                                    e.preventDefault();
                                    porver.parentNode.remove();
                                    db.peliculas.put({ 
                                        titulo: title, 
                                        poster: poster,
                                        sinopsis: plot, 
                                        score: score,
                                        _id: String(Date.now())
                                    })

                                    alert.innerHTML = `<div class="alert alert-success" role="alert">
                                                        Se agregó con éxito a la sección Ver más tarde
                                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                        </div>`;
                                    setTimeout(() => {
                                        alert.innerHTML = '';
                                    }, 3000);
                                    
                                });
                                input.value = '';                        
        })   
}        


function init(){
    db = new Dexie('DB-Peliculas');
    
    db.version(1).stores({ peliculas: '_id'});
    db.open()
    .then(refreshView);
}

function refreshView(){
    return db.peliculas.toArray()
    .then(mostrarPeliculas);
}

function mostrarPeliculas(peliculas){
    for (let i = 0; i < peliculas.length; i++) {
        console.log(peliculas[i]);
        vermastarde.innerHTML = `<div class="card">
                                    <img class="card-img-top" src="${peliculas.poster}" alt="${peliculas.titulo}" />
                                    <div class="card-body">
                                        <h2 class="text-center">${peliculas.titulo}</h2>
                                    </div>  
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">
                                            <p>Descripción:</p>
                                            <span>${peliculas.sinopsis}<span>
                                        <li class="list-group-item">
                                            <p>Calificación:</p>
                                            <span><strong>${peliculas.score}/10</strong><span>
                                    </ul>  
                                    <div class="text-center pt-3 pb-3">
                                        <button type="button" id="porverdelete" class="btn btn-outline-danger text-center">Eliminar de la lista</button>
                                    </div>
                                </div>`;
    }
    /*peliculas.forEach(function(pelicula, peli) {
        
    });*/
}

window.onload = function (){
    init();
}

window.addEventListener("offline", (e) => {
    console.log('offine');
    let nav = d.getElementsByClassName('.navbar');
    nav.classList.add('off');
    console.log(nav);
  });
  
window.addEventListener("online", (e) => {
    console.log('online');
    let nav = d.getElementsByClassName('.navbar');
    nav.classList.add('on');
  });
  
  // Escucho si el navegador esta online o no, util en los casos que entro sin conexion.
  if (!navigator.onLine) {
    console.log("estoy sin conexion!!");
    let nav = d.getElementsByClassName('.navbar');
    nav.classList.remove('on', 'bg-light');
    nav.classList.add('off');
  }

  $(function(){ 
    var navMain = $(".navbar-collapse");

    navMain.on("click", "a", null, function () {
        navMain.collapse('hide');
    });
});

let installButton = document.createElement('button');
let prompt;

window.addEventListener('beforeinstallprompt', function(e){
  e.preventDefault();
  prompt = e;
});

installButton.addEventListener('click', function(){
   prompt.prompt();
})

let installed = false;
installButton.addEventListener('click', async function(){
  prompt.prompt();
  let result = await that.prompt.userChoice;
  if (result&&result.outcome === 'accepted') {
     installed = true;
  }
})

window.addEventListener('appinstalled', async function(e) {
    installButton.style.display = "none";
 });
 