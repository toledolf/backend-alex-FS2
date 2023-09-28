import Agendamento from "../Modelo/Agendamento.js";
import Usuario from "../Modelo/Usuario.js";
import conectar from "./Conexao.js";
import Campo from "../Modelo/Campo.js";

export default class AgendamentoDB {
  async inserirDados(agendamento) {
    if (agendamento instanceof Agendamento) {
      const conexao = await conectar();
      if (conexao) {
        try {
          const sql =
            "INSERT INTO agendamento (data, horario, cpfUsuario) VALUES (?, ?, ?)";
          const valores = [agendamento.data, agendamento.horario, agendamento.cpfUsuario];
          const resultado = await conexao.query(sql, valores);

          const idAgendamento = resultado[0].insertId;

          for (const item of agendamento.listaCampos) {
            const sql2 =
              "INSERT INTO agendamento_campo (idCampo, idAgendamento) VALUES (?, ?)";
            const params = [item.idCampo, idAgendamento];
            await conexao.query(sql2, params);
          }
        } catch (erro) {
          throw erro;
        }
      }
    }
  }

  /* async alterarDados(agendamento) {
    if (agendamento instanceof Agendamento) {
      const conexao = await conectar();
      const sql =
        "UPDATE agendamento SET campo = ?, data = ?, horario = ?, \
                                         cpfUsuario = ? \
                         WHERE codigo = ?";
      const valores = [
        agendamento.campo,
        agendamento.data,
        agendamento.horario,
        agendamento.cpfUsuario,
        agendamento.codigo,
      ];
      await conexao.query(sql, valores);
      //global.poolConexoes.pool.releaseConnection(conexao);
    }
  } */

  /* async excluirDados(agendamento) {
    if (agendamento instanceof Agendamento) {
      const conexao = await conectar();
      const sql = "DELETE FROM agendamento WHERE codigo = ?";
      const valores = [agendamento.codigo];
      await conexao.query(sql, valores);
      //global.poolConexoes.pool.releaseConnection(conexao);
    }
  } */

  async consultar() {
    const listaAgendamentos = [];
    const conexao = await conectar();
    const sql =
      "SELECT * FROM agendamento as a INNER JOIN usuario as u ON u.cpf = a.cpfUsuario";

    const [agendamentos] = await conexao.query(sql);
    //global.poolConexoes.pool.releaseConnection(conexao);

    for (const linha of agendamentos) {
      const usuario = new Usuario(linha["cpf"], linha["nome"]);
      const agendamento = new Agendamento(
        linha["id"],
        linha["data"],
        linha["horario"],
        usuario,
        []
      );
      const sql2Items =
        "SELECT * FROM campo as c INNER JOIN agendamento_campo as i ON c.id = i.idCampo";

      const params = [agendamento.id];
      const [agendamentoCampos] = await conexao.query(sql2Items, params);
      //global.poolConexoes.pool.releaseConnection(conexao);

      let listaCampos = [];

      for (const item of agendamentoCampos) {
        const campo = new Campo(item["id"], item["corReferencial"], item["descricao"]);
        listaCampos.push(campo);
      }
      agendamento.listaCampos = listaCampos;
      listaAgendamentos.push(agendamento);
    }

    return listaAgendamentos;
  }

  async consultarId(id) {
    const listaAgendamentos = [];
    const conexao = await conectar();
    const sql =
      "SELECT * FROM agendamento as a INNER JOIN usuario as u ON u.cpf = a.cpfUsuario WHERE a.id = ?";

    const [agendamentos] = await conexao.query(sql, [id]);
    //global.poolConexoes.pool.releaseConnection(conexao);

    for (const linha of agendamentos) {
      const usuario = new Usuario(linha["cpf"], linha["nome"]);
      const agendamento = new Agendamento(
        linha["id"],
        linha["data"],
        linha["horario"],
        usuario,
        []
      );
      const sql2Items =
        "SELECT * FROM campo as c INNER JOIN agendamento_campo as i ON c.id = i.idCampo";

      const params = [agendamento.id];
      const [agendamentoCampos] = await conexao.query(sql2Items, params);
      //global.poolConexoes.pool.releaseConnection(conexao);

      let listaCampos = [];

      for (const item of agendamentoCampos) {
        const campo = new Campo(item["id"], item["corReferencial"], item["descricao"]);
        listaCampos.push(campo);
      }
      agendamento.listaCampos = listaCampos;
      listaAgendamentos.push(agendamento);
    }

    return listaAgendamentos;
  }
}
