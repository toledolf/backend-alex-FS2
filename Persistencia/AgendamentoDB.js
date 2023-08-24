import Agendamento from '../Modelo/Agendamento.js';
import conectar from './Conexao.js';

export default class AgendamentoDB {
    async inserirDados(agendamento) {

        if (agendamento instanceof Agendamento) {
            const conexao = await conectar();
            const sql = "INSERT INTO agendamento (campo, data, horario, usuario) \
                                           VALUES(?, ?, ?, ?)";
            const valores = [agendamento.id, agendamento.campo, agendamento.data,
            agendamento.horario, agendamento.usuario];
            await conexao.query(sql, valores);
        }
    }

    async alterarDados(agendamento) {

        if (agendamento instanceof Agendamento) {
            const conexao = await conectar();
            const sql = "UPDATE agendamento SET campo = ?, data = ?, horario = ?, \
                                         usuario = ? \
                         WHERE id = ?";
            const valores = [agendamento.campo, agendamento.data, agendamento.horario, agendamento.usuario,
            agendamento.id];
            await conexao.query(sql, valores);
        }
    }

    async excluirDados(agendamento) {

        if (agendamento instanceof Agendamento) {
            const conexao = await conectar();
            const sql = "DELETE FROM agendamento WHERE id = ?";
            const valores = [agendamento.id];
            await conexao.query(sql, valores);
        }
    }

    async consultarDados(especificidade) {
        const conexao = await conectar();
        const sql = "SELECT * FROM agendamento WHERE id LIKE ?";
        const valores = ['%' + especificidade + '%']
        const [rows] = await conexao.query(sql, valores);
        const listaAgendamentos = [];
        for (const row of rows) {
            const agendamento = new Agendamento(row['id'], row['campo'], row['data'],
                row['horario'], row['usuario'])
            listaAgendamentos.push(agendamento);
        }
        return listaAgendamentos;
    }

    async consultarId(id) {
        const conexao = await conectar();
        const sql = "SELECT * FROM agendamento WHERE id =  ?";
        const valores = [id]
        const [rows] = await conexao.query(sql, valores);
        const listaAgendamentos = [];
        for (const row of rows) {
            const agendamento = new Agendamento(row['id'], row['campo'], row['data'],
                row['horario'], row['usuario'])
                listaAgendamentos.push(agendamento);
        }
        return listaAgendamentos;
    }
}
