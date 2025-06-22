const sql = require("mssql");
const dotenv = require("dotenv");

function cargarConfigSegunRol(rol) {
  const archivoEnv = rol === "usuario" ? ".env.usuario" : ".env.admin";
  dotenv.config({ path: archivoEnv });

  return {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  };
}

async function obtenerConexion(rol = "admin") {
  const config = cargarConfigSegunRol(rol);
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error("Error de conexión:", err);
    throw err;
  }
}

module.exports = {
  sql,
  obtenerConexion
};
