const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');



// Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//Cors
app.use(cors());


//Directorio Publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());


//Rutas
app.use('/api/auth/', require('./routes/auth'));

// CRUD : eventos
app.use('/api/events/', require('./routes/events'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

//Escuchar Peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})