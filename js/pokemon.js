let urlPkm = "https://pokeapi.co/api/v2/pokemon/" //url de la api que contiene los datos de UN POKEMON
//lamentablemente, no existe un url para obtener TODOS los pokemon
//como no existe ese llamado, vamos a tener que iterar este llamado, la cantidad de veces que querramos

let pkm = [] //array que va a contener los pkm fetcheados

var search = "" // variable que va a contener el valor del input

async function fetchPkm(id) { //funcion que trae los datos de UN SOLO pkm
    let response = await fetch(urlPkm+id) //lo primero que tiene que hacer la funcion es ESPERAR la carga de un archivo (base de datos)
    let data = await response.json() // espero la transformacion del json
    //console.log(data)
    return data
}

async function fetchPokems(n1,n2) { //funcion que trae los datos de TODOS los pkm del intervalo
    for (let i=n1; i<=n2; i++) { //iteracion de la funcion que me trae los datos de UN SOLO pkm
        let data = await fetchPkm(i) //consumo la api
        pkm.push(data) //pusheo los datos en un array
    }
    console.log(pkm)
    createPkm(pkm)
}

fetchPokems(1,151)

function createPkm(arrayPkm) { //funcion que imprime TODOS los pkm
    let innerPkm = "" //seteo la variable que va a almacenar TODOS los templates
    arrayPkm.forEach((everyPkm) => {//recorro el array que entra como parámetro para guardar en cada ciclo el template correspondiente
            innerPkm += `
            <div class="d-flex flex-column flex-wrap justify-content-center align-items-center text-center cardPkm">
                <p>${everyPkm.name}</p>
                <img src=${everyPkm.sprites.front_default}>
            </div>
            `
    })
    document.querySelector("#pkmTable").innerHTML =innerPkm //imprimo en el selector correspondiente
}

async function pkmToFilter(event) { //funcion que trae los datos de los pkm filtrados
    let search = event.target.value
    let filter = pkm.filter(everyPkm => everyPkm.name.toLowerCase().startsWith(search.toLowerCase().trim()))
    console.log(filter)
    createPkm(filter)
}

document.querySelector("#search").addEventListener("keyup",pkmToFilter)