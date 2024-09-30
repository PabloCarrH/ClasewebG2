const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
// CORS configuration
const corsOptions = {
    origin: '*', // Be cautious with this in production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'web'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
    }
    console.log('Conexión a la base de datos MySQL establecida.');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});


// Registro de usuarios (profesionales y clientes)
app.post('/api/register/user', async (req, res) => {
    const { name, email, password, userType } = req.body;

    // Verificar si el usuario ya existe
    const sqlCheck = 'SELECT * FROM users WHERE email = ?';
    db.query(sqlCheck, [email], async (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error en la base de datos.' });
        }
        if (results.length > 0) {
            return res.status(409).json({ message: 'El usuario ya está registrado.' });
        }

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const sqlInsert = 'INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)';
        db.query(sqlInsert, [name, email, hashedPassword, userType], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al registrar el usuario.' });
            }
            res.status(201).json({ message: 'Registro de usuario exitoso.' });
        });
    });
});

// Inicio de sesión
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (error, results) => {
        if (error || results.length === 0) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos.' });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, match) => {
            if (err || !match) {
                return res.status(401).json({ message: 'Email o contraseña incorrectos.' });
            }

            // Obtener datos adicionales según el tipo de usuario
            const userType = user.user_type === 'professional' ? 'usersProfesional' : 'usersCliente';
            const sqlAdditionalData = `SELECT * FROM ${userType} WHERE user_id = ?`;

            db.query(sqlAdditionalData, [user.id], (err, additionalResults) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al obtener los datos del usuario.' });
                }

                // Preparar la respuesta
                const additionalData = additionalResults[0] || {};
                res.status(200).json({
                    message: 'Inicio de sesión exitoso.',
                    id: user.id,
                    name: user.name,
                    celular: additionalData.celular,
                    isProfessional: user.user_type === 'professional'
                });
            });
        });
    });
});


// Ruta para manejar el formulario
app.post('/api/submit-form', (req, res) => {
    const { service, cost, startDate, endDate, clientName, providerName } = req.body;

    const sqlInsert = `
    INSERT INTO publicacion (user_id, servicio, costo, fechaInicio, fehcaFinal, NomCliente, NomProfecional, asignado) 
    VALUES (?, ?, ?, ?, ?, ?, ?, false)`;

    const userId = 1; // Cambia esto si tienes lógica para capturar el user_id

    db.query(sqlInsert, [userId, service, cost, startDate, endDate, clientName, providerName], (error, results) => {
        if (error) {
            console.error('Error al insertar en la base de datos:', error);
            return res.status(500).json({ message: 'Error en la base de datos.' });
        }
        res.status(201).json({ message: 'Formulario enviado con éxito.' });
    });
});
// Ruta para obtener información del usuario
app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id;

    // Primero obtenemos la información básica del usuario
    const sqlUser = 'SELECT * FROM users WHERE id = ?';
    db.query(sqlUser, [userId], (error, userResults) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener los datos del usuario.' });
        }
        if (userResults.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const user = userResults[0];

        // Ahora obtenemos la información adicional según el tipo de usuario
        const userTypeTable = user.user_type === 'professional' ? 'usersProfesional' : 'usersCliente';
        const sqlAdditionalData = `SELECT * FROM ${userTypeTable} WHERE user_id = ?`;

        db.query(sqlAdditionalData, [user.id], (error, additionalResults) => {
            if (error) {
                return res.status(500).json({ message: 'Error al obtener los datos adicionales del usuario.' });
            }

            const additionalData = additionalResults[0] || {};

            res.status(200).json({
                userType: user.user_type,
                userData: {
                    name: user.name,
                    email: user.email,
                    celular: additionalData.celular || null,
                    direccion: additionalData.direccion || null,
                    servicio: additionalData.servicio || null,
                    descripcionserv: additionalData.descripcionserv || null,
                    experiencia: additionalData.experiencia || null,
                    certificaciones: additionalData.certificaciones || null,
                    tarifa: additionalData.tarifa || null,
                    disponibilidad: additionalData.disponibilidad || null,
                    informacionad: additionalData.informacionad || null
                }
            });
        });
    });
});

// Ruta para obtener todas las publicaciones sin asignar 
app.get('/api/publicaciones', (req, res) => {
    const sql = 'SELECT * FROM publicacion WHERE asignado = 0';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener las publicaciones.' });
        }
        res.status(200).json(results);
    });
});

// Ruta para aceptar una oferta
app.put('/api/publicacion/:id', (req, res) => {
    const publicacionId = req.params.id;
    const { asignado } = req.body;

    const sqlUpdate = 'UPDATE publicacion SET asignado = ? WHERE id = ?';
    db.query(sqlUpdate, [asignado, publicacionId], (error, results) => {
        if (error) {
            console.error('Error al actualizar la base de datos:', error);
            return res.status(500).json({ message: 'Error al actualizar la publicación.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Publicación no encontrada.' });
        }

        res.status(200).json({ message: 'Publicación actualizada correctamente.' });
    });
});

// Ruta para obtener todas las publicaciones asignadas
app.get('/api/publicaciones/asignadas', (req, res) => {
    const sql = 'SELECT * FROM publicacion WHERE asignado = 1';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener las publicaciones.' });
        }
        res.status(200).json(results);
    });
});


