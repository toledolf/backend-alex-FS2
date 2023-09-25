export default class AgendamentoCampo {
  #idAgendamento;
  #idCampo;

  constructor(idAgendamento, idCampo) {
    this.#idAgendamento = idAgendamento;
    this.#idCampo = idCampo;
  }

  get idAgendamento() {
    return this.#idAgendamento;
  }

  set idAgendamento(novoIdAgendamento) {
    this.#idAgendamento = novoIdAgendamento;
  }

  get idCampo() {
    return this.#idCampo;
  }

  set idCampo(novoIdCampo) {
    this.#idCampo = novoIdCampo;
  }

  toJSON() {
    return {
      idAgendamento: this.#idAgendamento,
      idCampo: this.#idCampo,
    };
  }

  async gravar() {
    const agendamentoCampoBD = new agendamentoCampoBD();
    await agendamentoCampoBD.inserirDados(this);
  }
}
