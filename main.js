// Referencia al canvas en el html
var canvas = document.getElementById("myCanvas");
// Validamos si el canvas existe
if (canvas && canvas.getContext) {
    // Inicializamos el contexto del canvas
    var context = canvas.getContext("2d");
    // Validamos si el contexto existe
    if (context) {
        // Instanciamos la clase Personas
        var personas = new Personas();
        // Creamos el evento mousemove
        canvas.addEventListener(
            "mousemove",
            function (evt) {
                // Instanciamos la clase Persona
                var jugador = new Persona(25, 25);
                // Creamos la funcion oMousePos y la asignamos a la variable mousePos
                var mousePos = oMousePos(canvas, evt);
                // Utilizamos el método setPosicion de la clase Persona
                jugador.setPosicion(mousePos.x, mousePos.y);
                // Limpiamos el contexto del canvas
                context.clearRect(0, 0, canvas.width, canvas.height);
                // Utilizamos el método graficarTodos de la clase Personas
                personas.graficarTodos(context, jugador);
                // Utilizamos el método graficar de la clase Persona
                jugador.graficar(context);
                // Utilizamos el método calcularPorcentaje de la clase Personas
                // Y se le asigna a la variable result
                var result = personas.calcularPorcentaje();
                // Insertamos html en elemento output
                document.getElementById("output").innerHTML =
                    `<h1>Porcentaje de Infección: <span style="color: red;">` +
                    result.porcentaje +
                    `%</span>
                     - <span>Cuando k = ` +
                    result.k +
                    `</span></h1>`;
            },
            false
        );
    }
}
// Creamos la función oMousePos
function oMousePos(canvas, evt) {
    // Obtenemos la posición relativa respecto a la ventana de visualización
    // Y la asignamos a la variable ClienteRect
    var ClientRect = canvas.getBoundingClientRect();
    // Retornamos las posiciones en x, y
    return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top),
    };
}