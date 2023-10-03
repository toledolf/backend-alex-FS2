import AgendamentoBD from "../Persistencia/AgendamentoDB.js";
export default class Agendamento {
  #id;
  #data;
  #horario;
  #cpfUsuario;
  #listaCampos;

  constructor(id, data, horario, cpfUsuario, listaCampos) {
    this.#id = id;
    this.#data = data;
    this.#horario = horario;
    this.#cpfUsuario = cpfUsuario;
    this.#listaCampos = listaCampos;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    this.#id = novoId;
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

  get cpfUsuario() {
    return this.#cpfUsuario;
  }

  set cpfUsuario(novoCpfUsuario) {
    this.#cpfUsuario = novoCpfUsuario;
  }

  get listaCampos() {
    return this.#listaCampos;
  }

  set listaCampos(novaListaCampos) {
    this.#listaCampos = novaListaCampos;
  }

  toJSON() {
    return {
      id: this.#id,
      data: this.#data,
      horario: this.#horario,
      cpfUsuario: this.#cpfUsuario,
      listaCampos: this.#listaCampos,
    };
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
    const agendamentos = await agendamentoBD.consultar(especificidade);
    return agendamentos;
  }

  async consultarId(id) {
    const agendamentoBD = new AgendamentoBD();
    const agendamentos = await agendamentoBD.consultarId(id);
    return agendamentos;
  }
}
