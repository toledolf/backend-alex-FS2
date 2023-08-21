import TimeBD from '../Persistencia/TimeDB.js'
export default class Time {
    #id;
    #nomeTime;
    #tecnico;
    #corReferencial;
    #categoria;

    constructor(id, nomeTime, tecnico, categoria, corReferencial) {
        this.#id = id;
        this.#nomeTime = nomeTime;
        this.#tecnico = tecnico;
        this.#corReferencial = corReferencial;
        this.#categoria = categoria;

    }

    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get nomeTime() {
        return this.#nomeTime;
    }

    set nomeTime(novoNome) {
        this.#nomeTime = novoNome;
    }

    get tecnico() {
        return this.#tecnico;
    }

    set tecnico(novoTecnico) {
        this.#tecnico = novoTecnico;
    }

    get corReferencial() {
        return this.#corReferencial;
    }

    set corReferencial(novaCorReferencial) {
        this.#corReferencial = novaCorReferencial;
    }

    get categoria() {
        return this.#categoria;
    }

    set categoria(novaCategoria) {
        this.#categoria = novaCategoria;
    }

    toJSON() {
        return {
            "id"            : this.#id,
            "nomeTime"      : this.#nomeTime,
            "tecnico"       : this.#tecnico,
            "corReferencial": this.#corReferencial,
            "categoria"     : this.#categoria,
        }
    }

    async gravar() {
        const timeBD = new TimeBD();
        await timeBD.inserirDados(this);
    }

    async atualizar() {
        const timeBD = new TimeBD();
        await timeBD.alterarDados(this);
    }

    async excluirDados() {
        const timeBD = new TimeBD();
        await timeBD.excluirDados(this);
    }

    async consultar(especificidade) {
        const timeBD = new TimeBD();
        const times = await timeBD.consultarDados(especificidade);
        return times;
    }

    async consultarId(id) {
        const timeBD = new TimeBD();
        const times = await timeBD.consultarId(id);
        return times;
    }
}
