
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const bd = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME
});

bd.connect((error) => {
    if (error) {
        console.error('Error de conexión a la base de datos: ' + error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/css', express.static(path.join(__dirname, 'css')));


app.get('/', (req, res) => {
    const query = 'SELECT * FROM Bitacora';
    bd.query(query, (error, resultados) => {
        if (error) {
            console.error('Error al obtener los registros: ' + error);
            return res.status(500).send('Error al obtener los registros');
        }
        res.render('index', { bitacoras: resultados });
    });
});


app.post('/bitacora', (req, res) => {
    const { fecha_hora_ronda, area_sector_revisado, punto_control, estado, observaciones, seguimiento_requerido, inspector_operador } = req.body;
    const query = `INSERT INTO Bitacora (fecha_hora_ronda, area_sector_revisado, punto_control, estado, observaciones, seguimiento_requerido, inspector_operador) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    bd.query(query, [fecha_hora_ronda, area_sector_revisado, punto_control, estado, observaciones, seguimiento_requerido, inspector_operador], (error, resultados) => {
        if (error) {
            console.error('Error al crear el registro: ' + error);
            return res.status(500).send('Error al crear el registro');
        }
        res.redirect('/');
    });
});


app.get('/bitacora/delete/:id', (req, res) => {
    const bitacoraid = req.params.id;
    const query = 'DELETE FROM Bitacora WHERE id = ?';
    bd.query(query, [bitacoraid], (error, resultados) => {
        if (error) {
            console.error('Error al eliminar el registro: ' + error);
            return res.status(500).send('Error al eliminar el registro');
        }
        res.redirect('/');
    });
});


app.get('/bitacora/edit/:id', (req, res) => {
    const bitacoraid = req.params.id;
    const query = 'SELECT * FROM Bitacora WHERE id = ?';
    bd.query(query, [bitacoraid], (error, resultados) => {
        if (error) {
            console.error('Error al obtener el registro: ' + error);
            return res.status(500).send('Error al obtener el registro');
        }

        
        if (resultados[0] && resultados[0].fecha_hora_ronda) {
            const fecha = new Date(resultados[0].fecha_hora_ronda);
            resultados[0].fecha_hora_ronda = fecha.toISOString().slice(0,16);
        }

        res.render('edit', { bitacora: resultados[0] });
    });
});


app.post('/bitacora/update/:id', (req, res) => {
    const bitacoraid = req.params.id;
    const { fecha_hora_ronda, area_sector_revisado, punto_control, estado, observaciones, seguimiento_requerido, inspector_operador } = req.body;
    const query = `UPDATE Bitacora SET fecha_hora_ronda = ?, area_sector_revisado = ?, punto_control = ?, estado = ?, observaciones = ?, seguimiento_requerido = ?, inspector_operador = ? WHERE id = ?`;
    bd.query(query, [fecha_hora_ronda, area_sector_revisado, punto_control, estado, observaciones, seguimiento_requerido, inspector_operador, bitacoraid], (error, resultados) => {
        if (error) {
            console.error('Error al actualizar el registro: ' + error);
            return res.status(500).send('Error al actualizar el registro');
        }
        res.redirect('/');
    });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
