const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const obraSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes'
    },
    obra : {
        type: String,
        trim: true,
        unique:true,
    },
    empresa :{
        type: String,
        trim: true
    },
    inicio: {
        type: String,
        trim: true
    },
    final: {
        type: String,
        trim: true
    },
    productos: [{
        product: {
            type: Schema.ObjectId,
            ref: 'Productos'
        },
        cantidad: Number,
        ambiente: String
    }]
    
})

module.exports = mongoose.model('Obras',obraSchema);