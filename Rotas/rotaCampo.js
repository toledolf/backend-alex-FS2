import { Router } from "express";
import CampoCTRL from "../Controle/campoCtrl.js";

const rotaCampo = new Router();
const campoCtrl = new CampoCTRL();

rotaCampo
  .get("/:id", campoCtrl.consultar)
  .get("/", campoCtrl.consultar)
  .post("/", campoCtrl.gravar)
  .put("/", campoCtrl.atualizar)
  .delete("/", campoCtrl.excluir);

export default rotaCampo;
