/* 
descripcion:
al iniciar se consumira los datos de la API por medio de una funcion que recibira 2 parametros
item que sera igual a 'pag' o 'name' en donde pag traera los datos por pagina y
name que sera igual al valor ingresado por el usuario 
 */


// funcion para consumir api 
function consumirApi(item,valor){
    fetch(`https://rickandmortyapi.com/api/character?${item}=${valor}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let datosArray = data.results;
        // llamado de funcion para mostrar datos de la API
        mostrarDatosArray(datosArray);
    })
    .catch(function(err) {
        console.error(err);
    });
}
// inicializamos la funcion para consumir api  item = pag y valor =1, por lo tanto se crgara la primera pagina
consumirApi('pag',1)


// boton de pagina siguiente 
let pagSiguiente = document.querySelector('#btnNext')
// agregar evento click al boton pagSiguiente 
pagSiguiente.addEventListener('click',contadorPagina);

let cont = 1;
// funcion para crear contador para pagina 
function contadorPagina(){
    /* hay 671 datos en total en la Api debido a que solo se mostraran 20 el 
    valor maximo que debe llegar a tener cont = 671/20 = 33 */

    // validar que cont al llegar a 33 se reinicie 
    if(cont == 33){
        cont = 0;
    }
    cont += 1;
    // llamar funcion que consume Api,le pasamos el valor de cont como numero de pagina a mostrar 
    consumirApi('pag',cont)
}

// funcion para mostrar datos de la API
function mostrarDatosArray(data){
    // ul donde se mostrara el listado de 20 personajes 
    let listado = document.querySelector('.listado');
    // limpiar el listado 
    listado.innerHTML = "";
    // for para rrecorrer los datos del api 
    data.forEach(element => {        
        // crear html con informacion de la api 
        let nuevoPersonaje = document.createElement('li');
        nuevoPersonaje.className = 'cajaPersonaje';
        nuevoPersonaje.innerHTML = `
            <div class="imagen">
                <img src="${element.image}" alt="img-personaje:${element.id}">
            </div>
            <div class="datos">
                <div class="nombre"><h2>${element.name}</h2></div>                
                <p><label class="lbl" >Estado &nbsp;:</label> &nbsp;<span>${element.status}</span></p>
                <p><label class="lbl" >Especie :</label> &nbsp;<span>${element.species}</span></p>
                <p><label class="lbl" >Genero  :</label> &nbsp;<span>${element.gender}</span></p>
                <p><label class="lbl" >Origen  &nbsp;:</label> &nbsp;<span>${element.origin.name}</span></p>
            </div>
        `;
        // agregar el li creado al Ul-listado 
        listado.appendChild(nuevoPersonaje);
    });
}



// boton buscar
let btnBuscar = document.getElementById('btnBuscar');
// capturar texto a buscar
let Buscar = document.getElementById('buscar');

// agregar evento click al boton buscar
btnBuscar.addEventListener('click', buscarEnLista);

//agregar evento keypress para buscar con la tecla enter 
Buscar.addEventListener('keypress', function(e){    
    const tecla = e.which || e.keyCode;
    if (tecla == 13) {
        buscarEnLista();
    }
})

//funcion para buscar 
function buscarEnLista(){
    // validar que no venga vacio el campo buscar 
    if(Buscar.value == ""){
        alert('El campo buscar se encuentra vacio');
    }else{
    //   tomo el valor 
    let nombre = Buscar.value;
    // llamo para consumir la Api con el nombre a buscar 
    consumirApi('name',nombre)
    }
    
}
