import Treinador from '../Modelo/Treinador.js';

export default class TreinadorCTRL{
    
    gravar(requisicao, resposta){

        resposta.type("application/json");
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const telefone = dados.telefone;
            const nome = dados.nome;
            const email = dados.email;
            const descricao = dados.descricao;
            if(telefone && nome && email && descricao){
                const treinador = new Treinador(telefone, nome, email, descricao);
                treinador.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Treinador gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente todos os dados de um treinador conforme documentação da API!"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou o treinador no formato JSON não fornecido! Consulte a documentação da API."
            });
        }
    }

    atualizar(requisicao, resposta){

        resposta.type("application/json");
        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const id = dados.id
            const telefone = dados.telefone;
            const nome = dados.nome;
            const email = dados.email;
            const descricao = dados.descricao;
            if(id && nome && telefone && email && descricao){
                const treinador = new Treinador(id, telefone, nome, email, descricao);
                treinador.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Treinador atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente todos os dados de um treinador conforme documentação da API!"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou o treinador no formato JSON não fornecido! Consulte a documentação da API."
            });
        }
    }
    
    excluir(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const id = dados.id;
            if(id){
                const treinador = new Treinador(id);
                treinador.removerDoBancoDados().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Treinador excluído com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe o código do treinador conforme documentação da API!"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou o campo no formato JSON não fornecido! Consulte a documentação da API."
            });
        }
    }

    consultar(requisicao, resposta){

        resposta.type("application/json");
        if(requisicao.method === "GET"){
            const treinador = new Treinador();
            treinador.consultar('').then((treinadores)=>{
                    resposta.status(200).json(treinadores);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                     mensagem: erro.message
                });
            });
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação da API."
            });
        }
    }

    consultarPeloCOD(requisicao, resposta){

        resposta.type("application/json");

        const id = requisicao.params['id'];

        if(requisicao.method === "GET"){
            const treinador = new Treinador();
            treinador.consultarCOD(id).then((treinadores)=>{
                    resposta.status(200).json(treinadores);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                     mensagem: erro.message
                });
            });
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação da API."
            });
        }
    }
}