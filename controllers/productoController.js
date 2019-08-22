const Producto = require('../models/Productos');

const multer = require('multer');
const path = require('path')

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: path.join(__dirname, '../public/uploads'),
        filename: (req,file,cb) => {
            cb(null,file.originalname);
        }
    }),
    fileFilter(req,file,cb){
        if(file.mimetype === 'image/jpeg' ||  file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
            cb(null,true);
        }else{
            cb(new Error('Formato no valido'))
        }
    }
}

// Pasar la configuracion y el campo

const upload = multer(configuracionMulter).single('imagen');

// Subiendo el archivo

exports.subirArchivo = async(req,res,next) => {
    upload(req,res,function(error){
        if(error){
            res.json({mensaje: error})
        }
        return next();
    })
}

// Nuevo Producto

exports.nuevoProducto = async(req,res,next) => {
    const producto = new Producto(req.body);

    try {
        if(req.file.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje: 'Se agrego el producto correctamente'})
    } catch (error) {
        console.log(error)
        next();
    }
}

// Obteniendo todos los productos

exports.obtenerProductos = async(req,res,next) => {
    try {
        const productos = await Producto.find({});
        res.json(productos)
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra un producto en especifico por su ID

exports.mostrarProducto = async (req, res, next) => {
    const producto = await Producto.findById(req.params.idProducto);

    if(!producto) {
        res.json({mensaje : 'Ese Producto no existe'});
        return next();
    }

    // Mostrar el producto
    res.json(producto);
}

// Actualiza un producto via id

exports.actualizarProducto = async (req, res, next) => {
    try {
        // construir un nuevo producto
        let nuevoProducto = req.body;

        // verificar si hay imagen nueva
        if(req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            let productoAnterior = await Producto.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        
        let producto = await Producto.findOneAndUpdate({_id : req.params.idProducto}, nuevoProducto, {
            new : true,
        });

        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Elimina un producto via ID
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Producto.findByIdAndDelete({ _id : req.params.idProducto });
        res.json({mensaje : 'El Producto se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}


// Buscar un producto 
exports.buscarProducto = async (req, res, next) => {
    try {
        // obtener el query
        const { query } = req.params;
        const producto = await Producto.find({ codigo: new RegExp(query, 'i') });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}