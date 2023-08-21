import { Router } from "express";
import TimeCTRL from "../Controle/timeCtrl.js";

const rotaTime = new Router();
const timeCtrl = new TimeCTRL();

rotaTime.get('/', timeCtrl.consultar)
  .post('/', timeCtrl.gravar)
  .put('/', timeCtrl.atualizar)
  .delete('/', timeCtrl.excluir)
  .get('/:id', timeCtrl.consultarPorId);

export default rotaTime;
