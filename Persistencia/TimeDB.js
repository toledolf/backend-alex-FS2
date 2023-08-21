import Time from '../Modelo/Time.js';
import conectar from './Conexao.js';

export default class TimeDB {
    async inserirDados(time) {

        if (time instanceof Time) {
            const conexao = await conectar();
            const sql = "INSERT INTO time (nomeTime, tecnico, corReferencial, categoria) \
                                           VALUES(?, ?, ?, ?)";
            const valores = [time.id, time.id, time.nomeTime, time.tecnico,
            time.corReferencial, time.categoria];
            await conexao.query(sql, valores);
        }
    }

    async alterarDados(time) {

        if (time instanceof Time) {
            const conexao = await conectar();
            const sql = "UPDATE time SET nomeTime = ?, tecnico = ?, corReferencial = ?, \
                                         categoria = ? \
                         WHERE id = ?";
            const valores = [time.nomeTime, time.tecnico, time.corReferencial, time.categoria,
            time.id];
            await conexao.query(sql, valores);
        }
    }

    async excluirDados(time) {

        if (time instanceof Time) {
            const conexao = await conectar();
            const sql = "DELETE FROM time WHERE id = ?";
            const valores = [time.id];
            await conexao.query(sql, valores);
        }
    }

    async consultarDados(especificidade) {
        const conexao = await conectar();
        const sql = "SELECT * FROM time WHERE id LIKE ?";
        const valores = ['%' + especificidade + '%']
        const [rows] = await conexao.query(sql, valores);
        const listaTimes = [];
        for (const row of rows) {
            const time = new Time(row['id'], row['nomeTime'], row['tecnico'],
                row['corReferencial'], row['categoria'])
            listaTimes.push(time);
        }
        return listaTimes;
    }

    async consultarId(id) {
        const conexao = await conectar();
        const sql = "SELECT * FROM time WHERE id =  ?";
        const valores = [id]
        const [rows] = await conexao.query(sql, valores);
        const listaTimes = [];
        for (const row of rows) {
            const time = new Time(row['id'], row['nomeTime'], row['tecnico'],
                row['corReferencial'], row['categoria'])
            listaTimes.push(time);
        }
        return listaTimes;
    }
}
