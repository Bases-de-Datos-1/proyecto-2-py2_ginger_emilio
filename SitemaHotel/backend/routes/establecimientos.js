const express = require("express");
const router = express.Router();
const { obtenerConexion } = require("../db");

// GET /api/establecimientos?rol=usuario
router.get("/", async (req, res) => {
  const rol = req.query.rol === "usuario" ? "usuario" : "admin";
  try {
    const pool = await obtenerConexion(rol);
    const result = await pool.request().query("SELECT * FROM Vista_Establecimiento_Completo");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener establecimientos" });
  }
});

module.exports = router;
