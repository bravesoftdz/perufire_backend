const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'Agrega un correo valido',
        trim: true
    },
    nombre: {
        type: String,
        required: 'Agrega tu nombre'
    },
    apellido: {
        type: String,
        required: 'Agrega tu apellido'
    },
    empresa: {
        type: String,
        required: 'Agrega tu empresa'
    },
    celular: {
        type: String,
        required: 'Agrega tu celular'
    },
    password: {
        type: String,
        required :true
    }
})

module.exports = mongoose.model('Usuarios', usuarioSchema);