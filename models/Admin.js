const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    password: {
        type: String,
        required :true
    }
})

module.exports = mongoose.model('Administradores', adminSchema);