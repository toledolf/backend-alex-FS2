import mysql from "mysql2/promise";

export default async function conectar() {
  if (global.poolConexoes) {
    return await global.poolConexoes.getConnection();
  }

  const poolConexoes = await mysql.createPool({
    host: "localhost",
    user: "aluno2-pfsii",
    port: 3306,
    password: "EuBtlvczijBauc4G7Qla",
    database: "backendalex",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  global.poolConexoes = poolConexoes;

  return await poolConexoes.getConnection();
}

/* import mysql from 'mysql2/promise';

export default async function conectar() {
  try {
    if (global.conexao && global.conexao.status !== "disconnected") {
      return global.conexao;
    }

    const conexao = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "backend"
    });

    global.conexao = conexao;

    return conexao;
  } catch (e) {
    console.error("Erro ao conectar ao banco de dados:", e);
    throw e; // Lança o erro novamente para que quem chame a função possa tratá-lo
  }
}
 */
