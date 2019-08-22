const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({path: 'variables.env'})

const app = express();

// Conectar con MONGODB
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true
}).then(db => console.log('Conectado a MongoDB')).catch(error => console.log(error))

// Carpetas Estaticas
app.use(express.static('public/uploads'));  

// Habilito JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Definir dominios para recibir las peticiones
const whiteList = [process.env.FRONTEND_URL];
const corsOption = {
    origin: (origin,callback) => {
        const existe = whiteList.some(dominio => dominio === origin);
        if(existe) {
            callback(null,true)
        }else{
            callback(new Error('No permitido por cors'))
        }
    }
}

// Cors permite que un cliente se conecte a un servidor
app.use(cors(corsOption));

// Rutas de la app
app.use('/',routes())

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

// Establesco el servidor
app.listen(port,host,() => {
    console.log('El servidor esta funcionando')
})