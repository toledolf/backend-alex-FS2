import mysql from "mysql2/promise";

export default async function conectar() {
  if (global.conexao && global.conexao.status != "disconnected") {
    return global.conexao;
  }

  const conexao = await mysql.createConnection({
    host: "localhost",
    user: "aluno2-pfsii",
    port: 'aluno2-pfsii',
    password: "bcSX9Agg1hClVYgz4Jeh",
    database: "aluno2-pfsii",
  });

  global.conexao = conexao;

  return conexao;
}
