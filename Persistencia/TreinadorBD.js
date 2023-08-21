import Treinador from '../Modelo/Treinador.js';
import conectar from './Conexao.js';

export default class TreinadorBD{

    async incluir(treinador){

        if (treinador instanceof Treinador){
            const conexao = await conectar();
            const sql = "INSERT INTO treinador( telefone, nome, email, descricao) VALUES(?,?,?,?)";
            const valores = [treinador.id,treinador.telefone,treinador.nome,treinador.email,treinador.descricao];
            await conexao.query(sql,valores);
        }
    }

    async alterar(treinador){

        if (treinador instanceof Treinador){
            const conexao = await conectar();
            const sql = "UPDATE treinador SET telefone=?, nome=?, email=?, descricao=?  WHERE id = ?";
            const valores = [treinador.telefone,treinador.nome,treinador.email,treinador.descricao,treinador.id];
            await conexao.query(sql,valores);
        }
    }

    async excluir(treinador){

        if (treinador instanceof Treinador){
            const conexao = await conectar();
            const sql = "DELETE FROM treinador WHERE id = ?";
            const valores = [treinador.id];
            await conexao.query(sql,valores);
        }  
    }

    async consultar(termo){
            const conexao = await conectar();
            const sql = "SELECT * FROM treinador WHERE id LIKE ?";
            const valores = ["%" + termo + "%"];
            const [rows] = await conexao.query(sql, valores);
            const listaTreinadores = [];
            for(const row of rows){
                const treinador = new Treinador(row ['id'],row['telefone'],row['nome'],row['email'],row['descricao']);
                listaTreinadores.push(treinador);
                //console.log(treinador.nome);            
        }
        return listaTreinadores;
    }

    async consultarCOD(id){
            const conexao = await conectar();
            const sql = "SELECT * FROM treinador WHERE id =?";
            const valores = [id];
            const [rows] = await conexao.query(sql, valores);
            const listaTreinadores = [];
            for(const row of rows){
                const treinador = new Treinador(row ['id'],row['telefone'],row['nome'],row['email'],row['descricao']);
                listaTreinadores.push(treinador);           
        }
        return listaTreinadores;
    }
}