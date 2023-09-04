import Agendamento from "../Modelo/Agendamento.js";
import Usuario from "../Modelo/Usuario.js";

export default class AgendamentoCTRL {
  gravar(req, resp) {
    resp.type("application/json");
    if (req.method === "POST") {
      const dados = req.body;
      const campo = dados.campo;
      const data = dados.data;
      const horario = dados.horario;
      const cpfUsuario = dados.usuario.cpf;
      const usuario = new Usuario(0, "")
        .consultaCodigo(cpfUsuario)
        .then((usuario) => {
          if (usuario) {
            const agendamento = new Agendamento(0, campo, data, horario, cpfUsuario)
              .gravar(() => {
                resp.json({
                  status: true,
                  codigo: agendamento.codigo,
                  mensagem: "Agendamento efetivado com sucesso!",
                });
              })
              .catch((err) => {
                resp.json({
                  status: false,
                  mensagem: err,
                });
              });
          } else {
            resp.json({
              status: false,
              mensagem: "Usuário não encontrato!",
            });
          }
        })
        .catch((err) => {
          resp.json({
            status: false,
            mensagem: err,
          });
        });
      /* if (campo && data && horario && usuario) {
        const agendamento = new Agendamento(campo, data, horario, usuario);
        agendamento
          .gravar()
          .then(() => {
            resp.status(200).json({
              status: true,
              mensagem: "Agendamento inserido no banco com sucesso!",
            });
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
          mensagem:
            "Informe adequadamente todos os dados de um Agendamento conforme documentação da API!",
        });
      }
    } else {
      resp.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou Agendamento no formato JSON não fornecido!\
                          Consulte a documentação da API.",
      });
    } */
    }
  }

  atualizar(req, resp) {
    resp.type("application/json");
    if (req.method === "PUT") {
      const dados = req.body;
      const codigo = dados.codigo;
      const campo = dados.campo;
      const data = dados.data;
      const horario = dados.horario;
      const cpfUsuario = dados.usuario.codigo;
      const usuario = new Usuario(0, "")
        .consultaCodigo(cpfUsuario)
        .then((usuario) => {
          if (usuario) {
            const agendamento = new Agendamento(0, campo, data, horario, cpfUsuario)
              .gravar(() => {
                resp.json({
                  status: true,
                  codigo: agendamento.codigo,
                  mensagem: "Agendamento atualizado com sucesso!",
                });
              })
              .catch((err) => {
                resp.json({
                  status: false,
                  mensagem: err,
                });
              });
          } else {
            resp.json({
              status: false,
              mensagem: "Usuário não encontrato!",
            });
          }
        })
        .catch((err) => {
          resp.json({
            status: false,
            mensagem: err,
          });
        });

      /* if (id && campo && data && horario && usuario) {
        const agendamento = new Agendamento(id, campo, data, horario, usuario);
        agendamento
          .atualizar()
          .then(() => {
            resp.status(200).json({
              status: true,
              mensagem: "Agendamento atualizado com sucesso!",
            });
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
          mensagem:
            "Informe adequadamente todos os dados de um Agendamento conforme documentação da API!",
        });
      } */
      /* } else {
      resp.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou Agendamento no formato JSON não fornecido!\
                          Consulte a documentação da API.",
      });
    } */
    }
  }

  excluir(req, resp) {
    resp.type("application/json");
    if (req.method === "DELETE") {
      const dados = req.body;
      const codigo = dados.codigo;
      if (codigo) {
        const agendamento = new Agendamento(codigo);
        agendamento
          .excluirDados()
          .then(() => {
            resp.status(200).json({
              status: true,
              mensagem: "Agendamento excluído com sucesso!",
            });
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
          mensagem:
            "Informe adequadamente todos os dados de um Agendamento conforme documentação da API!",
        });
      }
    } else {
      resp.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou cliente no formato JSON não fornecido!\
                          Consulte a documentação da API.",
      });
    }
  }

  consultar(req, resp) {
    resp.type("application/json");
    if (req.method === "GET") {
      const agendamento = new Agendamento();
      agendamento
        .consultar("")
        .then((agendamentos) => {
          resp.status(200).json(agendamentos);
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

  consultarPorCodigo(req, resp) {
    resp.type("application/json");

    const codigo = req.params["codigo"];

    if (req.method === "GET") {
      const agendamento = new Agendamento();
      agendamento
        .consultarCodigo(codigo)
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
