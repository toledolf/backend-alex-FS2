import AgendamentoBD from '../Persistencia/AgendamentoDB.js'
export default class Agendamento {
    #id;
    #campo;
    #data;
    #horario;
    #usuario;

    constructor(id, campo, data, usuario, horario) {
        this.#id = id;
        this.#campo = campo;
        this.#data = data;
        this.#horario = horario;
        this.#usuario = usuario;

    }

    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get campo() {
        return this.#campo;
    }

    set campo(novoCampo) {
        this.#campo = novoCampo;
    }

    get data() {
        return this.#data;
    }

    set data(novaData) {
        this.#data = novaData;
    }

    get horario() {
        return this.#horario;
    }

    set horario(novoHorario) {
        this.#horario = novoHorario;
    }

    get usuario() {
        return this.#usuario;
    }

    set usuario(novoUsuario) {
        this.#usuario = novoUsuario;
    }

    toJSON() {
        return {
            "id"      : this.#id,
            "campo"   : this.#campo,
            "data"    : this.#data,
            "horario" : this.#horario,
            "usuario" : this.#usuario,
        }
    }

    async gravar() {
        const agendamentoBD = new AgendamentoBD();
        await agendamentoBD.inserirDados(this);
    }

    async atualizar() {
        const agendamentoBD = new AgendamentoBD();
        await agendamentoBD.alterarDados(this);
    }

    async excluirDados() {
        const agendamentoBD = new AgendamentoBD();
        await agendamentoBD.excluirDados(this);
    }

    async consultar(especificidade) {
        const agendamentoBD = new AgendamentoBD();
        const agendamentos = await agendamentoBD.consultarDados(especificidade);
        return agendamentos;
    }

    async consultarId(id) {
        const agendamentoBD = new AgendamentoBD();
        const agendamentos = await agendamentoBD.consultarId(id);
        return agendamentos;
    }
}
