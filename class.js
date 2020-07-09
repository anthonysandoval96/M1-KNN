class Persona {
    // Creamos el constructor de la clase
    constructor(_x = null, _y = null) {
        // Definimos las propiedades de la clase
        this.distEuclidiana = 0
        this.distManhattan = 0
        // Sí se instancia con paramétros
        if (_x != null || _y != null) {
            this.x = _x;
            this.y = _y;
            this.estado = true;
            this.color = "blue";
        } else { // Si se instacia la clase sin parámetros
             // Creamos posiciones aleatorias dentro del canvas
            this.x = Math.floor(Math.random() * 1450) + 25;
            this.y = Math.floor(Math.random() * 700) + 25;
            // Sí es igual a 0, es una persona infectada
            if (Math.floor(Math.random() * 2) % 2 == 0) {
                this.estado = false;
                this.color = "#FF0000";
            } else { // Es una persona sana
                this.estado = true;
                this.color = "#4CAF50";
            }
        }
    }
    /* Creamos el método graficar, que nos servirá para poder graficar 
    las personas infectas y sanas. También graficar el jugador */
    graficar(context, x = null, y = null) {
        context.beginPath();
        // Le pasamos un color
        context.fillStyle = this.color;
        // Le pasamos las coordenadas
        context.arc(this.x, this.y, 20, 0, 2 * Math.PI);
        // Colocamos un texto al jugador
        context.strokeText("JUGADOR", this.x - 23, this.y + 40);
        context.closePath();        
        context.stroke();
        context.fill();
    }
    /* Creamos el método calcDistancia, que nos servirá 
    para poder calcular la distancia euclidiana y manhattan */
    calcDistancia(x, y) {
        this.distEuclidiana = Math.sqrt((this.x - x) * (this.x - x)+ (this.y - y) * (this.y - y));
        this.distManhattan = Math.abs(this.x - x)  + Math.abs(this.y - y);
    }
    /* Creamos el método setPosicion, que 
    nos servirá para poder pasarle las coordenadas,
    cuando movemos el mouse */
    setPosicion(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}

class Personas {
    // Creamos el constructor de la clase
    constructor() {
        // Definimos las propiedades de la clase
        this.nro_personas = 15;
        this.k = 4;
        this.personas = [];
        this.simular();
    }
    /* Creamos el método simular */
    simular() {
        document.getElementById("alumno").innerHTML = "<b>MOSQUERA SANDOVAL ANTHONY B.</b>";
        /* Insertamos todas las personas creadas aleatoriamente al arreglo personas */
        for (var i = 0; i < this.nro_personas; i++) {
            this.personas[i] = new Persona();
        }
    }
    /* Creamos el método graficarTodos */
    graficarTodos(context, p) {
        /* Recorremos todas las personas y las graficamos en el canvas */
        for (var i = 0; i < this.nro_personas; i++) {
            // Utilizamos el método calcDistancia de la clase Personas
            this.personas[i].calcDistancia(p.x, p.y);
            context.beginPath();
            // Le pasamos un color
            context.fillStyle = this.personas[i].color;
            // Le pasamos las coordenadas
            context.arc(this.personas[i].x, this.personas[i].y, 20, 0, 2 * Math.PI);
            // Solo se pinta las líneas con los k vecinos más cercanos
            if (i < this.k) {
                context.moveTo(this.personas[i].x, this.personas[i].y);
                context.lineTo(p.x, p.y);
                context.strokeText("EU: " + this.personas[i].distEuclidiana + " -- " + "MT: " + this.personas[i].distManhattan, this.personas[i].x - 50, this.personas[i].y + 35);
            }
            context.closePath();        
            context.stroke();
            context.fill();
        }
        // Utilizamos el método calcularPorcentaje de la misma clase
        this.calcularPorcentaje();
    }
    /* Creamos el método calcularPorcentaje */
    calcularPorcentaje() {
        /* Definimos las variables a utilizar */
        var contI = 0;
        var porcentaje = 0;
        /* Ordenamos ascendentemente el arreglo persnas */
        this.personas.sort(function(a, b) { 
            return (a.distEuclidiana - b.distEuclidiana) 
        });
        /* Contabilizamos las personas infectadas 
        de acuerdo a los k vecinos más cercanos */
        for (var i = 0; i < this.k; i++) { 
            if (!this.personas[i].estado) {
                contI++; 
            }
        }
        /* Calculamos el porcentaje */
        porcentaje = parseFloat(100 * contI / this.k).toFixed(2);
        /* Retornamos el valor del porcentaje y del k utilizado */
        return { 
            porcentaje: porcentaje, 
            k: this.k 
        };
    }
}