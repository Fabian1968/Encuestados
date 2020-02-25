//Modelo
class Modelo {
    constructor() {
        this.preguntas = JSON.parse(localStorage.getItem("preguntas")) || [];
        this.ultimoId = 0;
        var contexto = this;


        //inicializacion de eventos
        this.preguntaAgregada = new Evento(this);
        this.preguntaBorrada = new Evento(this);
        this.preguntasBorradas = new Evento(this);
        this.preguntaEditada = new Evento(this);
        this.respuestaAgregada = new Evento(this);
        this.respuestaVotada = new Evento(this);
    }

    //se obtiene el id más grande asignado a una pregunta
    obtenerUltimoId() {
        var ultimoId = 0;
        for (var i = 0; i < this.preguntas.length; i++) {
            if (this.preguntas[i].id > ultimoId) {
                ultimoId = this.preguntas[i].id;
            }

        }
        return ultimoId;

    }



    //se agrega una pregunta dado un nombre y sus respuestas
    agregarPregunta(nombre, respuestas) {
        var id = this.obtenerUltimoId();
        id++;
        var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
        this.preguntas.push(nuevaPregunta);
        this.guardar();
        this.preguntaAgregada.notificar();
    }

    borrarPregunta(id) {
        this.preguntas = this.preguntas.filter(function(pregunta) {
            return pregunta.id !== id;
        })
        this.guardar();
        this.preguntaBorrada.notificar();
    }

    borrarTodo() {
        this.preguntas = [];
        this.guardar();
        this.preguntasBorradas.notificar();
    }

    editarPregunta(id, pregunta) {
        var preguntaAEditar = this.preguntas.find(function(pregunta) {
            return pregunta.id === id;
        })
        if (preguntaAEditar) {
            preguntaAEditar.textoPregunta = pregunta;
            this.guardar();
            this.preguntaEditada.notificar();
        }
    }

    agregarRespuesta(id, respuestaAAgregar) {
        var preguntaASumarRespuesta = this.preguntas.find(function(pregunta) {
            return pregunta.id === id;
        })
        if (preguntaASumarRespuesta) {
            var nuevaRespuesta = { textoRespuesta: respuestaAAgregar, cantidad: 0 }
            preguntaASumarRespuesta.cantidadPorRespuesta.push(nuevaRespuesta);
            this.guardar();
            this.respuestaAgregada.notificar();
        }
    }

    agregarVoto(nombrePregunta, respuestaSeleccionada) {
        this.preguntas.forEach(pregunta => {
            if (pregunta.textoPregunta === nombrePregunta) {
                console.log(nombrePregunta);
                console.log(respuestaSeleccionada);
                pregunta.cantidadPorRespuesta.forEach(respuesta => {
                    if (respuesta.textoRespuesta === respuestaSeleccionada) {
                        respuesta.cantidad = respuesta.cantidad + 1;
                    }
                })
            }
        })

        this.guardar();
        this.respuestaVotada.notificar();
    }

    //se guardan las preguntas
    guardar() {
        localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
    }
}