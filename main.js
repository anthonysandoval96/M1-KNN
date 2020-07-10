/* Definimos el límite de personas a graficar */
var limit_personas = 50;
// Referencia al canvas en el html
var canvas = document.getElementById("myCanvas");
/* Definimos los ptos de inicio y final */
var pto_inicio = {x: 25, y: 25};
var pto_final = {x: canvas.width - pto_inicio.x, y: canvas.height - pto_inicio.y};
/* Inicializamos las variables */
var result_data, set_interval;
/* Llamamos a la función load, 
ni bien cargue la página */
load();
/* Creamos la función load */ 
function load(nro_personas = 15, k = 3) {
    /* Validamos si el canvas existe */
    if (canvas && canvas.getContext) {
        /* Inicializamos el contexto del canvas */
        var context = canvas.getContext("2d");
        /* Limpiamos el contexto del canvas */
        context.clearRect(0, 0, canvas.width, canvas.height);
        /* Instanciamos la clase Personas */
        var personas = new Personas(nro_personas, k);
        /* Instanciamos la clase Persona */
        var jugador = new Persona(pto_inicio.x, pto_inicio.y);
        /* Limpiamos el Interval */
        clearInterval(set_interval);
        /* Llamamos al seInterval para que
        se ejecute cada medio segundo la función route */
        set_interval = setInterval(function() { 
            route(context, personas, jugador) 
        }, 50);
        /* Creamos el evento submit para el form update */
        document.getElementById("update").addEventListener("submit", update);
        /* Creamos el evento click para el button refresh */
        document.getElementById("refresh").addEventListener("click", refresh);
    }
}
/* Creamos la función route, que se ejecutará cada n segundos
para que el jugador pueda avanzar solo */
function route(context, personas, jugador) {
    /* Limpiamos el contexto del canvas */
    context.clearRect(0, 0, canvas.width, canvas.height);
    /* Utilizamos el método graficarTodos de la clase Personas */
    personas.graficarTodos(context, jugador);
    /* Utilizamos el método graficar de la clase Persona */
    jugador.graficar(context);
    /* Utilizamos el método calcularPorcentaje de la clase Personas
    Y se le asigna a la variable result_data */
    result_data = personas.calcularPorcentaje();
    html_data(result_data);
    /* Sí máximo del ancho en x es menor 
    a la posición del jugador en x */
    if (pto_final.x > jugador.x) {
        /* Avanzar hacia la derecha, 5 posiciones */
        jugador.x += 5;
    } else if (pto_final.y > jugador.y) { /* Sí máximo del ancho en y es menor a la posición del jugador en y */
        /* Avanzar hacia la abajo, 5 posiciones */
        jugador.y += 5;
    }
}
/* Creamos la función refresh, para 
poder cargar los valores por defecto */
function refresh() {
    load();
}

function update(evt) {
    /* Cancela el evento submit, no refresanco la página */
    evt.preventDefault();
    /* Inicializamos variables necesarias */
    var string, nro_personas, k;
    /* Obtenemos la data enviada en el formulario serializando */
    string = $(this).serialize().split("&");
    nro_personas = string[0].split("=");
    nro_personas = nro_personas[1];
    k = string[1].split("=");
    k = k[1];
    /* Sí el límite de personas es menor o igual
    al número de personas ingresadas */
    if (limit_personas >= nro_personas) {
        /* Limpiamos los inputs */
        $(this).find("input[name='value_nro_personas']").val("");
        $(this).find("input[name='value_k']").val("");
        /* Mostramos una alerta de éxito */
        alert("Se actualizaron las varibles.");
        /* Volvemos a cargar la función load con parámetros */
        load(nro_personas, k);
    } else {
        /* Mostramos una alerta de error */
        alert("El límite del número de personas es de" + limit_personas + ".");
    }
}
/* Creamos la función html_data */
function html_data(result) {
    /* Insertamos html en elemento output
    pasando todas las propiedades obtenidas */
    document.getElementById("output").innerHTML =
        `<div class='h5 mt-4 mb-2'>Porcentaje de Infección: <span style="color: red;">` + result.porcentaje + `%</span></div>
        <div class='h5 mb-2'> Nº de personas total = ` + result.nro_personas + `</div>
        <div class='h5 mb-2'> k = ` + result.k + `</div>
        <div class='h5 mb-2'> Nº de personas infectadas = ` + result.nro_infectados + `</div>
        <div class='h5 mb-2'> Nº de personas sanas = ` + result.nro_sanos + `</div>
        `;
}