const express = require('express');
const router = express.Router();
const sql = require('mssql');

const dbConfig = {
    user: 'loginAdministrador',
    password: 'admin',
    server: 'localhost',
    database: 'GestionHotelera',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

router.get('/', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .query('SELECT * FROM Vista_Establecimiento_Completo');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener establecimientos desde la vista:', err);
        res.status(500).json({ message: 'Error al cargar la vista' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id_establecimiento', sql.Int, id)
            .execute('sp_EliminarEstablecimiento');
        res.json({ message: 'Eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar:', err);
        res.status(500).json({ message: 'No se pudo eliminar' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
        nombre,
        cedula_juridica,
        id_establecimiento_tipo,
        provincia,
        canton,
        distrito,
        barrio,
        senas_exactas,
        referencia_gps,
        telefono1,
        telefono2,
        telefono3,
        correo,
        url_sitio_web
    } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id_establecimiento', sql.Int, parseInt(id)) 
            .input('nombre', sql.VarChar(100), nombre)
            .input('cedula_juridica', sql.VarChar(20), cedula_juridica)
            .input('id_establecimiento_tipo', sql.Int, id_establecimiento_tipo)
            .input('provincia', sql.VarChar(50), provincia)
            .input('canton', sql.VarChar(50), canton)
            .input('distrito', sql.VarChar(50), distrito)
            .input('barrio', sql.VarChar(50), barrio)
            .input('senas_exactas', sql.VarChar(250), senas_exactas)
            .input('referencia_gps', sql.VarChar(100), referencia_gps)
            .input('telefono1', sql.VarChar(20), telefono1)
            .input('telefono2', sql.VarChar(20), telefono2)
            .input('telefono3', sql.VarChar(20), telefono3)
            .input('correo', sql.VarChar(100), correo)
            .input('url_sitio_web', sql.VarChar(250), url_sitio_web)
            .execute('sp_ActualizarEstablecimiento');

        res.status(200).json({ success: true, message: 'Hotel actualizado correctamente' });
    } catch (err) {
        console.error('Error al actualizar hotel:', err);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});


router.post('/', async (req, res) => {
    const {
        nombre,
        cedula_juridica,
        id_establecimiento_tipo,
        provincia,
        canton,
        distrito,
        barrio,
        senas_exactas,
        referencia_gps,
        telefono1,
        telefono2,
        telefono3,
        correo,
        url_sitio_web
    } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('nombre', sql.VarChar(100), nombre)
            .input('cedula_juridica', sql.VarChar(20), cedula_juridica)
            .input('id_establecimiento_tipo', sql.Int, id_establecimiento_tipo)
            .input('provincia', sql.VarChar(50), provincia)
            .input('canton', sql.VarChar(50), canton)
            .input('distrito', sql.VarChar(50), distrito)
            .input('barrio', sql.VarChar(50), barrio)
            .input('senas_exactas', sql.VarChar(250), senas_exactas)
            .input('referencia_gps', sql.VarChar(100), referencia_gps)
            .input('telefono1', sql.VarChar(20), telefono1)
            .input('telefono2', sql.VarChar(20), telefono2)
            .input('telefono3', sql.VarChar(20), telefono3)
            .input('correo', sql.VarChar(100), correo)
            .input('url_sitio_web', sql.VarChar(250), url_sitio_web)
            .execute('sp_InsertarEstablecimiento');

        res.status(201).json({ success: true, message: 'Hotel agregado correctamente' });
    } catch (err) {
        console.error('Error al insertar hotel:', err);
        res.status(500).json({ success: false, message: 'Error al agregar hotel' });
    }
});




module.exports = router;
