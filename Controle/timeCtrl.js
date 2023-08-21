import Time from '../Modelo/Time.js';

export default class TimeCTRL {
    gravar(req, resp) {
        resp.type('application/json');
        if (req.method === "POST" && req.is('application/json')) {
            const dados = req.body;
            const nomeTime = dados.nomeTime;
            const tecnico = dados.tecnico;
            const corReferencial = dados.corReferencial;
            const categoria = dados.categoria;
            if (nomeTime && tecnico && corReferencial && categoria) {
                const time = new Time(nomeTime, tecnico, corReferencial, categoria);
                time.gravar().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: "Time inserido no banco com sucesso!"
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
                    mensagem: "Informe adequadamente todos os dados de um time conforme documentação da API!"
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

    atualizar(req, resp) {
        resp.type('application/json');
        if (req.method === "PUT" && req.is('application/json')) {
            const dados = req.body;
            const id = dados.id;
            const nomeTime = dados.nomeTime;
            const tecnico = dados.tecnico;
            const corReferencial = dados.corReferencial;
            const categoria = dados.categoria;
            if (id && nomeTime && tecnico && corReferencial && categoria) {
                const time = new Time(id, nomeTime, tecnico, corReferencial, categoria);
                time.atualizar().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: "Time atualizado com sucesso!"
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
                    mensagem: "Informe adequadamente todos os dados de um time conforme documentação da API!"
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

    excluir(req, resp) {
        resp.type('application/json');
        if (req.method === "DELETE" && req.is('application/json')) {
            const dados = req.body;
            const id = dados.id;
            if (id) {
                const time = new Time(id);
                time.excluirDados().then(() => {
                    resp.status(200).json({
                        status: true,
                        mensagem: "Time excluído com sucesso!"
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
                    mensagem: "Informe adequadamente todos os dados de um time conforme documentação da API!"
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
            const time = new Time();
            time.consultar('').then((times) => {
                resp.status(200).json(times);
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
            const time = new Time();
            time.consultarId(id).then((time) => {
                resp.status(200).json(time);
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
