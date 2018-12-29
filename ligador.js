/**
 * @typedef {Object} Liga
 * @property {HTMLElement} elemento
 * @property {string} atributo
 * @property {keyof HTMLElementEventMap | function} [evento]
 */
class Ligador {
    /**
     * @param {{objeto: {}, propriedade: string}} config Objeto e sua propriedade
     */
    constructor(config) {
        /**
         * @type {Liga[]}
         */
        this._elementoLigas = [];

        this.setValor = config.objeto[config.propriedade];
        Object.defineProperty(config.objeto, config.propriedade, {
            get: () => this.getValor,
            set: val => this.setValor = val
        });
    }
    get getValor() {
        return this._valor;
    }
    /**
     * @param {Liga} liga
     */
    set setLiga(liga) {
        this._elementoLigas.push(liga);
    }
    set setValor(val) {
        this._valor = val;
        for (let liga of this._elementoLigas) {
            liga.elemento[liga.atributo] = val;
            if (liga.evento && typeof liga.evento === 'function') liga.evento.apply(this, Object.values(liga));
        }
    }
    /**
     * @param {HTMLElement} elemento
     * @param {string} atributo 
     * @param {keyof HTMLElementEventMap | function} [evento] Nome evento que será disparado a sincronização ou uma função customizada
     */
    adicionarLiga(elemento, atributo, evento) {
        const liga = {
            elemento: elemento,
            atributo: atributo
        };
        if (evento) {
            if (typeof evento === 'string') {
                elemento.addEventListener(evento, (e) => {
                    this.setValor = elemento[atributo]
                });
            }
            liga.evento = evento;
        }
        this.setLiga = liga;
        elemento[atributo] = this.getValor;
        return this;
    }
}