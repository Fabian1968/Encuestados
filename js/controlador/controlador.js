//Controlador
class Controlador {
    constructor(modelo) {
        this.modelo = modelo;
    }
    agregarPregunta(pregunta, respuestas) {
        this.modelo.agregarPregunta(pregunta, respuestas)
    }

    borrarPregunta(id) {
        this.modelo.borrarPregunta(id);
    }

    borrarTodo() {
        this.modelo.borrarTodo();
    }

    editarPregunta(id, pregunta) {
        if (pregunta) {
            this.modelo.editarPregunta(id, pregunta);
        }

    }

    agregarRespuesta(id, respuestaAAgregar) {
        this.modelo.agregarRespuesta(id, respuestaAAgregar);
    }

    agregarVoto(nombrePregunta, respuestaSeleccionada) {
        this.modelo.agregarVoto(nombrePregunta, respuestaSeleccionada);
    }
}