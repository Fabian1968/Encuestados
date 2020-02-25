//Vista administrador
class VistaAdministrador {
    constructor(modelo, controlador, elementos) {
        this.modelo = modelo;
        this.controlador = controlador;
        this.elementos = elementos;
        var contexto = this;
        // suscripción de observadores
        this.modelo.preguntaAgregada.suscribir(function() {
            contexto.reconstruirLista();
        });

        this.modelo.preguntaBorrada.suscribir(function() {
            contexto.reconstruirLista();
        })

        this.modelo.preguntasBorradas.suscribir(function() {
            contexto.reconstruirLista();
        })

        this.modelo.preguntaEditada.suscribir(function() {
            contexto.reconstruirLista();
        })

        this.modelo.respuestaAgregada.suscribir(function() {
            contexto.reconstruirLista();
        })

    }

    inicializar() {
        //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
        validacionDeFormulario();
        this.reconstruirLista();
        this.configuracionDeBotones();
    }
    construirElementoPregunta(pregunta) {
        var contexto = this;
        var nuevoItem = $('<li/>', {
            class: "list-group-item",
            id: pregunta.id,
            text: pregunta.textoPregunta
        });
        //completar
        //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
        var interiorItem = $('.d-flex');
        var titulo = interiorItem.find('h5');
        titulo.text(pregunta.textoPregunta);
        interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp) {
            return " " + resp.textoRespuesta;
        }));
        nuevoItem.html($('.d-flex').html());
        return nuevoItem;
    }

    reconstruirLista() {
        var lista = this.elementos.lista;
        lista.html("");
        var preguntas = this.modelo.preguntas;
        for (var i = 0; i < preguntas.length; ++i) {
            lista.append(this.construirElementoPregunta(preguntas[i]))
        }
    }

    configuracionDeBotones() {
        var e = this.elementos;
        var contexto = this;

        //asociacion de eventos a boton
        e.botonAgregarPregunta.click(function() {
            var value = e.pregunta.val();
            var respuestas = [];

            $('[name="option[]"]').each(function() {
                //completar
                var respuesta = $(this).val();
                if (respuesta.length > 0) {
                    respuestas.push({
                        textoRespuesta: respuesta,
                        cantidad: 0
                    })
                }
            });

            contexto.limpiarFormulario();
            contexto.controlador.agregarPregunta(value, respuestas);
        });
        //asociar el resto de los botones a eventos

        e.botonBorrarPregunta.click(function() {
            var id = parseInt($('.list-group-item.active').attr('id'));
            contexto.controlador.borrarPregunta(id);
        });

        e.borrarTodo.click(function() {
            contexto.controlador.borrarTodo();
        });

        e.botonEditarPregunta.click(function() {
            var id = parseInt($('.list-group-item.active').attr('id'));
            var pregunta = prompt("Edita aquí el texto de tu pregunta");
            contexto.controlador.editarPregunta(id, pregunta);

        });

        e.botonAgregarRespuesta.click(function() {
            var id = parseInt($('.list-group-item.active').attr('id'));
            console.log("click");
            var respuestaAAgregar = prompt("Agrega  aquí la nueva respuesta para la pregunta");
            contexto.controlador.agregarRespuesta(id, respuestaAAgregar);

        });

    }

    limpiarFormulario() {
        $('.form-group.answer.has-feedback.has-success').remove();
    }


}

/*
modelo.preguntas = [{
    textoPregunta: "Mi primer Pregunta",
    id: 0,
    cantidadPorRespuesta: [{
        textoRespuesta: "mi unica respuesta",
        cantidad: 2
    }]
}]
*/