import cors from "cors";
import express from "express";
import rotaTime from "./Rotas/rotaTime.js";
/* import rotaTreinador from "./Rotas/rotaTreinador.js"; */
import rotaUsuario from "./Rotas/rotaUsuario.js";

const app = express();

const host = "0.0.0.0";
const port = "4002";

app.use(cors({ origin: "*" }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/time", rotaTime);
/* app.use("/treinador", rotaTreinador); */
app.use("/usuario", rotaUsuario);

app.listen(port, host, () => {
  console.log(`API escutando no link: https://${host}/${port}/time`);
});

app.listen(port, host, () => {
  console.log(`API escutando no link: https://${host}/${port}/usuario`);
});

/* app.listen(3007, "localhost", () => {
  console.log("API escutando no link: http://localhost:3006/treinador");
});

app.listen(3006, "localhost", () => {
  console.log("API escutando no link: http://localhost:3007/usuarios");
});
 */