const Obra = require('../models/Obras');

// Agregamos una nueva obra via POST
exports.nuevoObra = async(req,res,next) => {
    const obra = new Obra(req.body);

    try {
        await obra.save();
        res.json({mensaje: 'Se agrego correctamente'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Obtenemos todas las obras via GET
exports.obtenerObras = async(req,res,next) => {
    try {
        const obras = await Obra.find({}).populate('cliente').populate({
            path: 'productos.product',
            model: 'Productos'
        });
        res.json(obras);
    } catch (error) {
        console.log(error)
        next();
    }
}

exports.obtenerObrasCliente = async(req,res,next) => {
    try {
        const obras = await Obra.find({cliente: req.params.idCliente}).populate('cliente').populate({
            path: 'productos.product',
            model: 'Productos'
        });
        res.json(obras);
    } catch (error) {
        console.log(error)
        next();
    }
}

// Muestra la obra por ID 
exports.mostrarObra = async(req,res,next) => {
    const obra = await Obra.findById(req.params.idObra).populate('cliente').populate(
        {
        path: 'productos.product',
        model: 'Productos'
        })

    if(!obra){
        res.json({mensaje: 'La obra no existe'})
        return next()
    }

    res.json(obra);
}

// Actualizar obra
exports.actualizarObra = async(req,res,next) => {
    try {
        let obra = await Obra.findOneAndUpdate({_id : req.params.idObra}, req.body, {
            new : true
        }).populate('cliente').populate(
            {
            path: 'productos.product',
            model: 'Productos'
            })
        res.json(obra)
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar Obra
exports.eliminarObra = async(req,res,next) => {
    try {
        await Obra.findByIdAndDelete({_id: req.params.idObra});
        res.json({mensaje: 'La obra se ha eliminado'})
    } catch (error) {
        console.log(error)
        next();
    }
}