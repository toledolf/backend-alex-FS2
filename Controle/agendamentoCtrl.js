import Agendamento from '../Modelo/Agendamento.js';

export default class AgendamentoCTRL {
    gravar(req, resp) {
        resp.type('application/json');
        if (req.method === "POST" && req.is('application/json')) {
            const dados = req.body;
            const campo = dados.campo;
            const data = dados.data;
            const horario = dados.horario;
            const usuario = dados.usuario;
            if (campo && data && horario && usuario) {
                const agendamento = new Agendamento(campo, data, horario, usuario);
                agendamento.gravar().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: "Agendamento inserido no banco com sucesso!"
                    });
                }).catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else {
                resp.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados de um Agendamento conforme documentação da API!"
                });
            }
        }
        else {
            resp.status(400).json({
                status: false,
                mensagem: "Método não permitido ou Agendamento no formato JSON não fornecido!\
                          Consulte a documentação da API."
            });
        }
    }

    atualizar(req, resp) {
        resp.type('application/json');
        if (req.method === "PUT" && req.is('application/json')) {
            const dados = req.body;
            const id = dados.id;
            const campo = dados.campo;
            const data = dados.data;
            const horario = dados.horario;
            const usuario = dados.usuario;
            if (id && campo && data && horario && usuario) {
                const agendamento = new Agendamento(id, campo, data, horario, usuario);
                agendamento.atualizar().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: "Agendamento atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else {
                resp.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados de um Agendamento conforme documentação da API!"
                });
            }
        }
        else {
            resp.status(400).json({
                status: false,
                mensagem: "Método não permitido ou Agendamento no formato JSON não fornecido!\
                          Consulte a documentação da API."
            });
        }
    }

    excluir(req, resp) {
        resp.type('application/json');
        if (req.method === "DELETE" && req.is('application/json')) {
            const dados = req.body;
            const id = dados.id;
            if (id) {
                const agendamento = new Agendamento(id);
                agendamento.excluirDados().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: "Agendamento excluído com sucesso!"
                    });
                }).catch((erro) => {
                    resp.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else {
                resp.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados de um Agendamento conforme documentação da API!"
                });
            }
        }
        else {
            resp.status(400).json({
                status: false,
                mensagem: "Método não permitido ou cliente no formato JSON não fornecido!\
                          Consulte a documentação da API."
            });
        }
    }

    consultar(req, resp) {
        resp.type('application/json');
        if (req.method === "GET") {
            const agendamento = new Agendamento();
            agendamento.consultar('').then((agendamentos) => {
                resp.status(200).json(agendamentos);
            }).catch((erro) => {
                resp.status(500).json({
                    status: false,
                    mensagem: erro.message
                })
            });
        }
        else {
            resp.status(400).json({
                status: false,
                mensagem: "Método não permitido! Consulte a documentação da API."
            });
        }
    }

    consultarPorId(req, resp) {
        resp.type('application/json');

        const id = req.params['id'];

        if (req.method === "GET") {
            const agendamento = new Agendamento();
            agendamento.consultarId(id).then((agendamento) => {
                resp.status(200).json(agendamento);
            }).catch((erro) => {
                resp.status(500).json({
                    status: false,
                    mensagem: erro.message
                })
            });
        }
        else {
            resp.status(400).json({
                status: false,
                mensagem: "Método não permitido! Consulte a documentação da API."
            });
        }
    }
}
