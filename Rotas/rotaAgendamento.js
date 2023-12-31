import { Router } from "express";
import AgendamentoCTRL from "../Controle/agendamentoCtrl.js";

const rotaAgendamento = new Router();
const agendamentoCtrl = new AgendamentoCTRL();

rotaAgendamento
  .get("/:id", agendamentoCtrl.consultarPorId)
  .get("/", agendamentoCtrl.consultar)
  .post("/", agendamentoCtrl.gravar)
  .put("/", agendamentoCtrl.atualizar)
  .delete("/", agendamentoCtrl.excluir);

export default rotaAgendamento;
