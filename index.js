import cors from "cors";
import express from "express";
import rotaTime from "./Rotas/rotaTime.js";
/* import rotaTreinador from "./Rotas/rotaTreinador.js"; */
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
/* app.use('/tecnico', rotaTecnico); */
/* app.use("/treinador", rotaTreinador); */


app.listen(porta, hostname, () => {
  console.log(`API escutando no link: https://${hostname}/${porta}/time`);
});

app.listen(porta, hostname, () => {
  console.log(`API escutando no link: https://${hostname}/${porta}/usuario`);
});

app.listen(porta, hostname, () => {
  console.log(`API escutando no link: https://${hostname}/${porta}/agendamento`);
});

/* app.listen(3007, "localhost", () => {
  console.log("API escutando no link: http://localhost:3006/treinador");
}); */
