import CampoDB from "../Persistencia/CampoDB.js";

export default class Campo{
  #id
  #corReferencial
  #descricao

  constructor(id, corReferencial, descricao){
    this.#id = id
    this.#corReferencial = corReferencial
    this.#descricao = descricao
  }

  get id(){
    return this.#id
  }

  set id(novoId){
    this.#id = novoId
  }

  get corReferencial(){
    return this.#corReferencial
  }

  set corReferencial(novaCorReferencial){
    this.#corReferencial = novaCorReferencial
  }

  get descricao(){
    return this.#descricao
  }

  set descricao(novaDescricao){
    this.#descricao = novaDescricao
  }

  toJSON(){
    return {
      id: this.#id,
      corReferencial: this.#corReferencial,
      descricao: this.#descricao
    }
  }

  async gravar() {
    const campoBD = new CampoDB();
    await campoBD.inserirDados(this);
  }

  async atualizar() {
    const campoBD = new CampoDB();
    await campoBD.alterarDados(this);
  }

  async excluirDados() {
    const campoBD = new CampoDB();
    await campoBD.excluirDados(this);
  }

  async consultar(especificidade) {
    const campoBD = new CampoDB();
    const campos = await campoBD.consultarDados(especificidade);
    return campos;
  }

  async consultarId(id) {
    const campoBD = new CampoDB();
    const campos = await campoBD.consultarPorID(id);
    return campos;
  }
}