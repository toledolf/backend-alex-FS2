import TreinadorBD from '../Persistencia/TreinadorBD.js';

export default class Treinador{

    #id;
    #telefone;		    // Telefone
    #nome; 		        // Nome do treinador
    #email;		        // E-mail
    #descricao;			// Breve descrição de sua experiência


    constructor( id, telefone, nome, email, descricao){
        this.#id = id;
        this.#telefone = telefone;
        this.#nome = nome;
		this.#email = email;
        this.#descricao = descricao;

              
    }


    get id(){
		return this.#id;
    }

    set id(novoId){
		this.#id = novoId;
    }

    get telefone(){
		return this.#telefone;
    }

    set telefone(novoTelefone){
		this.#telefone = novoTelefone;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

	get email(){
        return this.#email;
    }

    set email(novaEmail){
        this.#email = novaEmail;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    }


    toJSON(){
        return{
            "id"                : this.#id,
            "telefone"  	    : this.#telefone,
            "nome"     	        : this.#nome,
            "email" 		    : this.#email,
            "descricao"    		: this.#descricao,
        }
    }

    async gravar(){
        const treinadorBD = new TreinadorBD();
        await treinadorBD.incluir(this);
    }

    async atualizar(){
        const treinadorBD = new TreinadorBD();
        await treinadorBD.alterar(this);
    }

    async removerDoBancoDados(){
        const treinadorBD = new TreinadorBD();
        await treinadorBD.excluir(this);
    }

    async consultar(termo){
        const treinadorBD = new TreinadorBD();
        const treinadores = await treinadorBD.consultar(termo);
        return treinadores;
    }

    async consultarCOD(id){
        const treinadorBD = new TreinadorBD();
        const treinadores = await treinadorBD.consultarCOD(id);
        return treinadores;
    }

}