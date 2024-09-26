const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db'); //en este caso la configuración de la base de datos se hará en un archivo de la carpeta config
dotenv.config();