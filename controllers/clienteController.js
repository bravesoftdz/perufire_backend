const Clientes = require('../models/Clientes')

// Agregar Clientes
exports.nuevoCliente = async (req,res,next)=>{
    const cliente = new Clientes(req.body);

    try {
        await cliente.save();
        res.json({mensaje: 'Se agrego correctamente el nuevo cliente'})
    } catch (error) {
        res.send(error);
        next();
    }
}

// Obtener todos los clientes

exports.obtenerClientes = async(req,res,next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes)
    } catch (error) {
        res.send(error);
        next();
    }
}

// Se obtiene un cliente por ID
exports.mostrarCliente = async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);

    if(!cliente) {
        res.json({mensaje : 'El cliente no existe'});
        next()
    }
    // Mostrar el cliente
    res.json(cliente);
}

// Actualiza los clientes por ID

exports.actualizarCliente = async(req,res,next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({_id : req.params.idCliente},req.body,{
            new: true
        });
        res.json(cliente)
    } catch (error) {
        res.send(error);
        next();
    }
}

// Elimina el cliente 

exports.eliminarCliente = async(req,res,next) => {
    try {
        await Clientes.findByIdAndRemove({_id: req.params.idCliente});
        res.json({mensaje: 'El cliente se ha eliminado correctamente'})
    } catch (error) {
        console.log(error);
        next();
    }
}