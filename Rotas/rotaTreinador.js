import { Router } from "express";
import TreinadorCTRL from "../Controle/TreinadorCtrl.js";

const rotaTreinador = new Router();
const treinadorCTRL = new TreinadorCTRL();


rotaTreinador.post('/',treinadorCTRL.gravar)
.put('/',treinadorCTRL.atualizar)
.delete('/',treinadorCTRL.excluir)
.get('/', treinadorCTRL.consultar)
.get('/:telefone', treinadorCTRL.consultarPeloCOD)

export default rotaTreinador;