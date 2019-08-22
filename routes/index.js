const express = require('express')
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const obraController = require('../controllers/obraController');
const usuarioController = require('../controllers/usuarioController');
const adminController = require('../controllers/adminController');

// Middelware para protejer las rutas
const auth = require('../middleware/auth');


module.exports = function() {

    // Usuarios no Autenticados

    // Clientes

    // Agregamos nuevos clientes via POST
    router.post('/nuevo/cliente',
            clienteController.nuevoCliente);
    // Obtenemos los clientes via GET
    router.get('/clientes',
            // auth,
            clienteController.obtenerClientes);
    // Se obtiene un cliente por el ID via GET
    router.get('/clientes/:idCliente',
            // auth,
            clienteController.mostrarCliente);
    // Actualiza los clientes por ID via PUT
    router.put('/clientes/editar/:idCliente',
            // auth,
            clienteController.actualizarCliente);
    // Eliminar un cliente
    router.delete('/clientes/:idCliente',
            // auth,
            clienteController.eliminarCliente);


    // Productos

    // Agregamos nuevos productos via POST
    router.post('/nuevo/producto',
            auth,
            productoController.subirArchivo,productoController.nuevoProducto);
    // Muestra todos los productos via GET
    router.get('/productos',
            auth,
            productoController.obtenerProductos);
    // Actualizar el producto via PUT
    router.get('/productos/:idProducto',
            // auth,
            productoController.mostrarProducto);
    // Actualizar productos 
    router.put('/productos/editar/:idProducto',
            // auth,
            productoController.subirArchivo,productoController.actualizarProducto);
    // Eliminar Producto
            router.delete('/productos/:idProducto',
            // auth,
            productoController.eliminarProducto);
    // Buscar productos
    router.post('/productos/busqueda/:query',   
            // auth,
            productoController.buscarProducto);

    // Obras

    // Agregamos nuevos obras via POST
    router.post('/nuevo/obra/:idUsuario',
            auth,
            obraController.nuevoObra);
    // Muestra todos los obras via GET
    router.get('/obras',
            auth,
            obraController.obtenerObras);
    //Muestra las obras del cliente 
    router.get('/obras/cliente/:idCliente',
            // auth,
            obraController.obtenerObrasCliente);
    // Muestra las obras por id Cliente el producto via PUT
    router.get('/obras/:idObra',
            // auth,
            obraController.mostrarObra);
    // Actualizar productos 
    router.put('/obras/editar/:idObra',
            // auth,
            obraController.actualizarObra);
    // Eliminar productos
    router.delete('/obras/:idObra',
            obraController.eliminarObra);


    // Usuarios

    // Agregar usuarios
    router.post('/crear-cuenta',
            usuarioController.registrarUsuario);
    // Auntenticar usuario
    router.post('/login',
            usuarioController.autenticarUsuario);


    // Agregar usuarios
    router.post('/crear-cuenta/admin',
            adminController.registrarAdmin);

    // Auntenticar usuario
    router.post('/login/admin',
            adminController.autenticarAdmin);    
  
    return router;
}

