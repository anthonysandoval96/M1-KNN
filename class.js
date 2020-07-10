class Persona {
    /* Creamos el constructor de la clase */
    constructor(_x = null, _y = null) {
        /* Definimos las propiedades de la clase */
        this.distEuclidiana = 0;
        this.distManhattan = 0;
        /* Sí se instancia con paramétros */
        if (_x != null || _y != null) {
            this.x = _x;
            this.y = _y;
            this.estado = true;
            this.color = "blue";
        } else { /* Si se instacia la clase sin parámetros */
            /* Creamos posiciones aleatorias dentro del canvas */
            this.x = Math.floor(Math.random() * 950) + 25;
            this.y = Math.floor(Math.random() * 650) + 25;
            /* Sí es igual a 0, es una persona infectada */
            if (Math.floor(Math.random() * 2) % 2 == 0) {
                this.estado = false;
                this.color = "#FF0000";
            } else { /* Es una persona sana */
                this.estado = true;
                this.color = "#4CAF50";
            }
        }
    }
    /* Creamos el método graficar, solo para graficar el jugador */
    graficar(context, x = null, y = null) {
        /* Graficamos el contexto */
        context.beginPath();
        /* Le pasamos las coordenadas */
        context.arc(this.x, this.y, 20, 0, 2 * Math.PI);
        /* Le pasamos un color */
        context.fillStyle = this.color;
        /* Le colocamos un texto */
        context.strokeText("JUGADOR", this.x - 23, this.y + 40);
        context.fill();
        context.closePath();
    }
    /* Creamos el método calcDistancia, que nos servirá 
    para poder calcular la distancia euclidiana y manhattan */
    calcDistancia(x, y) {
        this.distEuclidiana = Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y));
        this.distManhattan = Math.abs(this.x - x) + Math.abs(this.y - y);
    }
}

class Personas {
    /* Creamos el constructor de la clase */
    constructor(_nro_personas, _k) {
        this.nro_personas = _nro_personas;
        this.k = _k;
        this.personas = [];
        this.simular();
    }
    /* Creamos el método simular */
    simular() {
        document.getElementById("alumno").innerHTML = "<b>MOSQUERA SANDOVAL ANTHONY B.</b>";
        for (var i = 0; i < this.nro_personas; i++) {
            this.personas[i] = new Persona();
        }
    }
    /* Creamos el método graficarTodos, para poder 
    graficar todas las personas sanas e infectadas */
    graficarTodos(context, p) {
        /* Recorremos todas las personas y calculamos sus distancias */
        for (var i = 0; i < this.nro_personas; i++) {
            this.personas[i].calcDistancia(p.x, p.y);
        }
        /* Ordenamos ascendentemente el arreglo persnas */
        this.personas.sort(function (a, b) { 
            return a.distEuclidiana - b.distEuclidiana; 
        });
        /* Recorremos todas las personas y las graficamos en el canvas */
        for (var i = 0; i < this.nro_personas; i++) {
            context.beginPath();
            context.fillStyle = this.personas[i].color;
            /* Dibujamos las personas en las posiciones aleatorias */
            context.arc(this.personas[i].x, this.personas[i].y, 20, 0, 2 * Math.PI);
            /* Enlazamos solos los k vecinos más cercanos */
            if (i < this.k) {
                /* Para pintar las líneas con el jugador */
                context.moveTo(this.personas[i].x, this.personas[i].y);
                context.lineTo(p.x, p.y);
                /* Para pintar las distancias */
                context.strokeText("EU: " + this.personas[i].distEuclidiana + " -- " + "MT: " + this.personas[i].distManhattan, this.personas[i].x - 50, this.personas[i].y + 35);
            }
            context.stroke();
            context.fill();
            context.closePath();
        }
    }
    /* Creamos el método calcularPorcentaje */
    calcularPorcentaje() {
        /* Definimos las variables a utilizar */
        var contI = 0;
        var contS = 0;
        var porcentaje = 0;
        /* Contabilizamos las personas infectadas y 
        sanas de acuerdo a los k vecinos más cercanos */
        for (var i = 0; i < this.k; i++) {
            if (this.personas[i].estado) {
                contS++; 
            } else {
                contI++;
            }
        }
        /* Calculamos el porcentaje */
        porcentaje = parseFloat((100 * contI) / this.k).toFixed(2);
        /* Retornamos el valor del porcentaje, del k utilizado, 
        el número de infectados y el número de sanos */
        return { 
            porcentaje: porcentaje, 
            k: this.k, nro_personas: this.nro_personas, 
            nro_infectados: contI, 
            nro_sanos: contS, 
        };
    }
}