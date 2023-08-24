import mysql from "mysql2/promise";

export default async function conectar() {
  if (global.conexao && global.conexao.status != "disconnected") {
    return global.conexao;
  }

  const conexao = await mysql.createConnection({
    host: "localhost",
    user: "aluno2-pfsii",
    port: "3306",
    password: "mem7giRLZSm7yALUI65m",
    database: "aluno2-pfsii",
  });

  global.conexao = conexao;

  return conexao;
}
