import cors from "cors";
import express from "express";
import rotaTime from "./Rotas/rotaTime.js";
import rotaUsuario from "./Rotas/rotaUsuario.js";

const hostname = "0.0.0.0";
const porta = "4002";

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/time", rotaTime);
app.use("/usuario", rotaUsuario);
app.use("/agendamento", rotaAgendamento);

app.listen(porta, hostname, () => {
  console.log(`API escutando no link: https://${hostname}/${porta}/time`);
});

app.listen(porta, hostname, () => {
  console.log(`API escutando no link: https://${hostname}/${porta}/usuario`);
});

app.listen(porta, hostname, () => {
  console.log(`API escutando no link: https://${hostname}/${porta}/agendamento`);
});
