const express = require('express');
require('dotenv').config();



// Crear el servidor de express
const app = express();


//Directorio Publico
app.use(express.static('public'));


//Rutas
app.use('/api/auth/', require('./routes/auth'));
//TODO: CRUD : eventos


//Escuchar Peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})