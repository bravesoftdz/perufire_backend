const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productosSchema = new Schema({
    codigo: {
        type: String,
        trim: true,
        unique: true
    },
    producto: {
        type: String,
        trim: true
    },
    resistencia: {
        type: String,
        trim: true
    },
    obraProducto: {
        type: String,
        trim: true
    },
    imagen: {
        type: String
    }
})

module.exports = mongoose.model('Productos', productosSchema);