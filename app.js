const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db'); //en este caso la configuración de la base de datos se hará en un archivo de la carpeta config
const bookRoutes = require('./routes/book.routes')




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})