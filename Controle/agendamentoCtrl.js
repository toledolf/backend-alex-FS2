import Agendamento from "../Modelo/Agendamento.js";
import Usuario from "../Modelo/Usuario.js";

export default class AgendamentoCTRL {
  async gravar(req, resp) {
    resp.type("application/json");

    if (req.method === "POST") {
      const dados = req.body;
      const data = dados.data;
      const horario = dados.horario;
      const cpfUsuario = dados.usuario.cpf;
      const listaCampos = dados.listaCampos;

      try {
        const agendamento = new Agendamento(0, data, horario, cpfUsuario, listaCampos);
        const usuario = await new Usuario(0, "").consultarCPF(cpfUsuario);

        if (cpfUsuario) {
          await agendamento.gravar();
          resp.status(200).json({
            status: true,
            mensagem: "Agendamento gravado com sucesso!",
          });
        }
        if (!cpfUsuario) {
          resp.status(400).json({
            status: false,
            mensagem: "Usuário não encontrado!",
          });
        }
      } catch (erro) {
        resp.json({
          status: false,
          mensagem: erro.message,
        });
      }
    }
  }

  async atualizar(req, resp) {
    resp.type("application/json");
    if (req.method === "PUT") {
      try {
        const dados = req.body;
        const id = dados.id;
        const data = dados.data;
        const horario = dados.horario;
        const agendamento = await new Agendamento(0, "").consultar(id);

        if (id) {
          const agendamento = new Agendamento(id, data, horario);
          await agendamento.atualizar();

          resp.json({
            status: true,
            codigo: agendamento.id,
            mensagem: "Agendamento atualizado com sucesso!",
          });
        } else {
          resp.json({
            status: false,
            mensagem: "Usuário não encontrado!",
          });
        }
      } catch (err) {
        resp.json({
          status: false,
          mensagem: "Usuário não encontrado!",
        });
      }
    }
  }

  async excluir(req, resp) {
    resp.type("application/json");
    if (req.method === "DELETE") {
      const dados = req.body;
      const idAgendamento = dados.agendamento_campo.idAgendamento;
      const agendamentoID = dados.agendamento.id;

      if (idAgendamento && agendamentoID) {
        try {
          const agendamento = new Agendamento(idAgendamento);
          const result = await agendamento.consultarId(idAgendamento);

          if (result.length > 0 && result[0].id === agendamentoID) {
            agendamento.excluirDados();
            resp.status(200).json({
              status: true,
              mensagem: "Agendamento excluído com sucesso!",
            });
          } else {
            resp.status(400).json({
              status: false,
              mensagem: "Agendamento não encontrado!",
            });
          }
        } catch (erro) {
          resp.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        }
      } else {
        resp.status(400).json({
          status: false,
          mensagem:
            "Informe adequadamente todos os dados de um Agendamento conforme documentação da API!",
        });
      }
    } else {
      resp.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou cliente no formato JSON não fornecido! Consulte a documentação da API.",
      });
    }
  }

  consultar(req, resp) {
    resp.type("application/json");
    if (req.method === "GET") {
      const id = req.query.id;
      const agendamento = new Agendamento();
      if (id) {
        agendamento
          .consultarId(id)
          .then((agendamento) => {
            resp.status(200).json(agendamento);
          })
          .catch((erro) => {
            resp.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        agendamento.consultar().then((agendamentos) => {
          resp.status(200).json(agendamentos);
        });
      }
    }
  }

  consultarPorId(req, resp) {
    resp.type("application/json");

    const id = req.params["id"];

    if (req.method === "GET") {
      const agendamento = new Agendamento();
      agendamento
        .consultarId(id)
        .then((agendamento) => {
          resp.status(200).json(agendamento);
        })
        .catch((erro) => {
          resp.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      resp.status(400).json({
        status: false,
        mensagem: "Método não permitido! Consulte a documentação da API.",
      });
    }
  }
}
