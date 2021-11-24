let d = document;
let db;
const url = 'https://www.omdbapi.com/?apikey=';
const API_KEY = '5c825fa0';
let buscar = d.getElementById('buscar');
let input = d.getElementById('input');
let info = d.getElementById('info');
//let mostrar = d.getElementById('mostrar');
let alerta = d.getElementById('alerta');
let vermastarde = d.getElementById('vermastarde');
let liVermastarde = d.getElementById('liVermastarde');
let home = d.getElementById('home');
let liHome = d.getElementById('liHome');
let buscador = d.getElementById('buscador');

vermastarde.style.display = 'none';

liHome.onclick = () => {
    vermastarde.style.display = 'none';
    home.style.display = 'block';
    buscador.style.display = 'block';
}

liVermastarde.onclick = () =>{
    home.style.display = 'none';
    vermastarde.style.display = 'block';
    buscador.style.display = 'none';
}


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
            alerta.innerHTML = `<div class="d-flex justify-content-center">
                                    <div class="spinner-grow text-warning" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>`;
            setTimeout(() => {
                alerta.innerHTML = '';
            }, 1500);

            setTimeout(() => {
                info.innerHTML = `<div class="card mt-3 mb-3 role="dialog">
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
                                    <div class="text-center mt-3 mb-3">
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
                    window.scrollTo(0,0);

                    alerta.innerHTML = `<div class="alert alert-success" role="alert">
                                        Se agregó con éxito a la sección Ver más tarde
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        </div>`;
                    setTimeout(() => {
                        alerta.innerHTML = '';
                    }, 3000);
                    
                });
                input.value = '';            
            }, 1500);
                        
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
        vermastarde.innerHTML = `<div class="card">
                                    <img class="card-img-top" src="${peliculas[i].poster}" alt="${peliculas[i].titulo}" />
                                    <div class="card-body">
                                        <h2 class="text-center">${peliculas[i].titulo}</h2>
                                    </div>  
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">
                                            <p>Descripción:</p>
                                            <span>${peliculas[i].sinopsis}<span>
                                        <li class="list-group-item">
                                            <p>Calificación:</p>
                                            <span><strong>${peliculas[i].score}/10</strong><span>
                                    </ul>  
                                    <div class="text-center pt-3 pb-3">
                                        <button type="button" id="porverdelete" class="btn btn-outline-danger text-center">Eliminar de la lista</button>
                                    </div>
                                </div>`;
                                let porverdelete = d.getElementById('porverdelete');
                                porverdelete.addEventListener('click', (e) => {
                                    e.preventDefault();
                                    db.transaction(peliculas, 'readwrite')
                                    .objectStore(peliculas)
                                    .delete(1);
                                    porverdelete.parentNode.remove();
                                })
    }
}



window.onload = function (){
    init();
}

window.addEventListener("offline", (e) => {
    console.log('offline');
    alerta.innerHTML = `<div class="alert alert-dark" role="alert">
                            ¡No hay conexión a internet!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
    let nav = d.getElementById('navbar');
    nav.classList.remove('online');
    nav.classList.add('offline');
  });
  
window.addEventListener("online", () => {
    console.log('online');
    alerta.innerHTML = '';
    let nav = d.getElementById('navbar');
    nav.classList.remove('offline');
    nav.classList.add('online');
  });
  
  // Escucho si el navegador esta online o no, util en los casos que entro sin conexion.
  if (!navigator.onLine) {
    console.log("estoy sin conexion!!");
    alerta.innerHTML = `<div class="alert alert-dark" role="alert">
                            Entraste a esta página pero no tenes internet :c
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
    let nav = d.getElementById('navbar');
    nav.classList.remove('online');
    nav.classList.add('offline');

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
 