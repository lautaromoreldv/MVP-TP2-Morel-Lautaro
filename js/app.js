let d = document;
let db;
const url = 'https://www.omdbapi.com/?apikey=';
const API_KEY = '5c825fa0';
//const yt = 'https://www.googleapis.com/youtube/v3/search?part=snippet&';
//const API_KEY_YT = 'AIzaSyDjiLbyZpoyoUwICJOpUh6nBtOq3lwMYtw';
let buscar = d.getElementById('buscar');
let input = d.getElementById('input');
let info = d.getElementById('info');
let alerta = d.getElementById('alerta');
let vermastarde = d.getElementById('vermastarde');
let liVermastarde = d.getElementById('liVermastarde');
let home = d.getElementById('home');
let liHome = d.getElementById('liHome');
let random = d.getElementById('random');
let liRandom = d.getElementById('liRandom');
let buscador = d.getElementById('buscador');
let mostrar = d.getElementById('mostrar');
let ver = d.getElementById('ver');

let Trailers = [
	{   
        nombre: 'Eternals',
        src: 'https://www.youtube.com/embed/v1EkoQV4g5c'
	},
    {
        nombre: 'Halloween Kills',
        src: 'https://www.youtube.com/embed/I-iJbMA3aoA'
    },
    {   
        nombre: 'Shang-Chi y la Leyenda de los Diez Anillos ',
        src: 'https://www.youtube.com/embed/BD77EOU8N3o'
	},
    {   
        nombre: 'Spider-Man sin camino a casa',
        src: 'https://www.youtube.com/embed/r6t0czGbuGI'
	},
    {
        nombre: 'Venom 2: Carnage Liberado',
        src: 'https://www.youtube.com/embed/-AnsJLpsxms'
    }
];
	

vermastarde.style.display = 'none';
random.style.display = 'none';

liHome.onclick = () => {
    vermastarde.style.display = 'none';
    home.style.display = 'block';
    buscador.style.display = 'block';
    random.style.display = 'none';
}

liVermastarde.onclick = () => { 
    home.style.display = 'none';
    vermastarde.style.display = 'block';
    buscador.style.display = 'none';
    random.style.display = 'none';
}

liRandom.onclick = () => {
    home.style.display = 'none';
    vermastarde.style.display = 'none';
    buscador.style.display = 'none';
    random.style.display = 'block';
    trailer();
}

function trailer(){
    let html = '';
    Trailers.forEach(function(pelis){
        html += `<div class="pt-3 pb-3">
                    <h3 class="text-center">${pelis.nombre}</h3>
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item" src="${pelis.src}" allowfullscreen></iframe>
                        </div>
                </div>`;
    });
    ver.innerHTML = html;
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
            const title = data.Title;
            const plot = data.Plot;
            const poster = data.Poster;
            const score = data.imdbRating;
            alerta.innerHTML = `<div class="d-flex justify-content-center mt-3 mb-3">
                                    <div class="spinner-grow text-warning" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>`;
            setTimeout(() => {
                alerta.innerHTML = '';
            }, 1500);

            setTimeout(() => {
                info.innerHTML = `<div class="d-sm-none">
                                    <div class="card mt-3 mb-3">
                                        <img class="card-img-top" src="${poster}" alt="${title}" />
                                            <div class="card-body">
                                                <h2 class="text-center">${title}</h2>
                                            </div>  
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">
                                                <p>Descripci??n:</p>
                                                <span>${plot}<span>
                                            <li class="list-group-item">
                                                <p>Calificaci??n:</p>
                                                <span><strong>${score}/10</strong><span>
                                        </ul>  
                                        <div class="text-center mt-3 mb-3">
                                            <button type="button" id="porver" class="btn btn-outline-info text-center porver">Ver m??s tarde</button>
                                        </div>
                                    </div>
                                </div>


                                <div class="row d-none d-sm-block">
                                <div class="col-12">
                                    <div class="card mt-3 mb-3">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-sm-5 col-md-5 col-lg-4 col-xl-3">
                                                    <div>
                                                        <img class="card-img-top" src="${poster}" alt="${title}" />
                                                    </div>
                                                </div>
                                                <div class="col-sm-7 col-md-7 col-lg-8 col-xl-9">
                                                    <h2 class="text-center">${title}</h2>
                                                    <ul class="list-group list-group-flush">
                                                        <li class="list-group-item">
                                                            <p>Descripci??n:</p>
                                                            <span>${plot}<span>
                                                        </li>
                                                        <li class="list-group-item">
                                                            <p>Calificaci??n:</p>
                                                            <span><strong>${score}/10</strong><span>
                                                        </li>    
                                                    </ul> 
                                                    <div class="text-center mt-3 mb-3">
                                                        <button type="button" id="porver2" class="btn btn-outline-info text-center">Ver m??s tarde</button>
                                                    </div>   
                                                </div>
                                            </div>   
                                        </div>  
                                    </div>    
                                </div>
                            </div>`;

                let porver = d.getElementById('porver');
                let porver2 = d.getElementById('porver2');
                let msj = `<div class="alert alert-success mt-3 mb-3" role="alert">
                                        Se agreg?? con ??xito a la secci??n Ver m??s tarde
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`;
                
                porver.addEventListener('click', (e) => {
                        e.preventDefault();
                        porver.parentNode.remove();
                        porver2.parentNode.remove();
                        db.peliculas.put({ 
                            titulo: title, 
                            poster: poster,
                            sinopsis: plot, 
                            score: score,
                            _id: String(Date.now())
                        })
                        .then(refreshView);
                        window.scrollTo(0,0);
                        alerta.innerHTML = msj;
                        setTimeout(() => {
                            alerta.innerHTML = '';
                        }, 3000);
                        
                    });
                    
                    porver2.addEventListener('click', (e) => {
                        e.preventDefault();
                        porver.parentNode.remove();
                        porver2.parentNode.remove();
                        db.peliculas.put({ 
                            titulo: title, 
                            poster: poster,
                            sinopsis: plot, 
                            score: score,
                            _id: String(Date.now())
                        })
                        .then(refreshView);
                        window.scrollTo(0,0);
                        alerta.innerHTML = msj;
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
    let html = '';
    peliculas.forEach(function(pelis){

        html += `<div class="col-12 divs">
                    <div class="card mt-3 mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-5 col-md-5 col-lg-4 col-xl-3">
                                    <div>
                                        <img class="card-img-top" src="${pelis.poster}" alt="${pelis.titulo}" />
                                    </div>
                                </div>
                                <div class="col-sm-7 col-md-7 col-lg-8 col-xl-9">
                                    <h2 class="text-center">${pelis.titulo}</h2>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">
                                                <p>Descripci??n:</p>
                                                <span>${pelis.sinopsis}<span>
                                            <li class="list-group-item">
                                                <p>Calificaci??n:</p>
                                                <span><strong>${pelis.score}/10</strong><span>
                                        </ul>  
                                        <div class="text-center pt-3 pb-3">
                                            <button type="button" id="${pelis._id}" class="btn btn-outline-danger text-center porverdelete">Eliminar de la lista</button>
                                        </div> 
                                </div>
                            </div>   
                        </div>  
                    </div>    
                </div>`;
    });
    mostrar.innerHTML = html;
    
    let botones = d.getElementsByClassName('porverdelete');
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener('click', borrar);
    }
}


function borrar(e){
    let id;
    if(e.target.hasAttribute('id')){
        e.preventDefault();
        id = e.target.getAttribute("id");
        db.peliculas.where('_id').equals(id).delete()
        .then(refreshView);
    }
}


window.onload = function (){
    init();
}

window.addEventListener("offline", (e) => {
    console.log('offline');
    alerta.innerHTML = `<div class="alert alert-dark mt-3" role="alert">
                            ??No hay conexi??n a internet!
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
    alerta.innerHTML = `<div class="alert alert-dark mt-3 mb-3" role="alert">
                            Entraste a esta p??gina pero no tenes internet :c
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