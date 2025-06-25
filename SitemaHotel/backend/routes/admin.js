const express = require('express');
const sql = require('mssql');
const router = express.Router();

const sqlBaseConfig = {
    server: 'localhost',
    database: 'GestionHotelera',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const config = {
            ...sqlBaseConfig,
            user: username,
            password: password
        };

        const pool = await sql.connect(config);

        const result = await pool.request().query(`SELECT IS_ROLEMEMBER('Administrador') AS esAdmin`);
        const esAdmin = result.recordset[0]?.esAdmin;

        if (esAdmin === 1) {
            return res.json({ success: true, role: 'Administrador' });
        } else {
            return res.status(403).json({ success: false, message: 'No tiene permisos de administrador.' });
        }
    } catch (err) {
        console.error('Error de conexión:', err.message);
        return res.status(401).json({ success: false, message: 'Credenciales inválidas o acceso denegado' });
    }
});

module.exports = router;