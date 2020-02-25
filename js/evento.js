//Evento
class Evento {
    constructor(emisor) {
        this.sujeto = emisor;
        this.observadores = [];
    }
    suscribir(observador) {
        this.observadores.push(observador);
    }
    notificar() {
        for (var i = 0; i < this.observadores.length; i++) {
            this.observadores[i](this.sujeto);
        }
    }
}
