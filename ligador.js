class Ligador {
    /**
     * @param {{objeto: {}, propriedade: string}} config Objeto e sua propriedade
     */
    constructor(config) {
        /**
         * @type {{elemento: HTMLElement, atributo: string}[]}
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
     * @param {{elemento: HTMLElement, atributo: string}} liga
     */
    set setLiga(liga) {
        this._elementoLigas.push(liga);
        this._elementoLigasLength = this._elementoLigas.length;
    }
    set setValor(val) {
        this._valor = val;
        for (let i = 0; i < this._elementoLigasLength; i++) {
            const liga = this._elementoLigas[i];
            liga.elemento[liga.atributo] = val;
        }
    }
    /**
     * @param {HTMLElement} elemento
     * @param {string} atributo 
     * @param {keyof HTMLElementEventMap} evento 
     */
    adicionarLiga(elemento, atributo, evento) {
        const liga = {
            elemento: elemento,
            atributo: atributo
        };
        if (evento) {
            elemento.addEventListener(evento, (e) => {
                this.setValor = elemento[atributo];
            });
            liga.evento = evento;
        }
        this.setLiga = liga;
        elemento[atributo] = this.getValor;
        return this;
    }
}