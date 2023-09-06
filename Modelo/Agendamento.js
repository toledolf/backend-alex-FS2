import AgendamentoBD from "../Persistencia/AgendamentoDB.js";
export default class Agendamento {
  #codigo;
  #campo;
  #data;
  #horario;
  #nomeUsuario;
  #cpfUsuario;

  constructor(codigo, campo, data, horario, nomeUsuario, cpfUsuario, ) {
    this.#codigo = codigo;
    this.#campo = campo;
    this.#data = data;
    this.#horario = horario;
    this.#nomeUsuario = nomeUsuario;
    this.#cpfUsuario = cpfUsuario;
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(novoCodigo) {
    this.#codigo = novoCodigo;
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

  get nomeUsuario() {
    return this.#nomeUsuario;
  }

  set nomeUsuario(novoNomeUsuario) {
    this.#nomeUsuario = novoNomeUsuario;
  }

  get cpfUsuario() {
    return this.#cpfUsuario;
  }

  set cpfUsuario(novoCpfUsuario) {
    this.#cpfUsuario = novoCpfUsuario;
  }

  toJSON() {
    return {
      codigo: this.#codigo,
      campo: this.#campo,
      data: this.#data,
      horario: this.#horario,
      nomeUsuario: this.#nomeUsuario,
      cpfUsuario: this.#cpfUsuario,
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
    const agendamentos = await agendamentoBD.consultarDados(especificidade);
    return agendamentos;
  }

  async consultarId(codigo) {
    const agendamentoBD = new AgendamentoBD();
    const agendamentos = await agendamentoBD.consultarId(codigo);
    return agendamentos;
  }
}
