const Usuario = require('../models/Usuarios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registrarUsuario = async(req,res) => {
    // leemos los datos entrados y colocamos dentro del modelo usuario
    const usuario = new Usuario(req.body);
    // hasheo del password
    usuario.password = await bcrypt.hash(req.body.password, 12);

    try {
        await usuario.save();
        res.json({mensaje: 'Usuario creado correctamente'})
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Hubo un error'})
    }
}

exports.autenticarUsuario = async(req,res,next) => {
    // Buscamos el usuario  
    const {email,password} =req.body
    const usuario = await Usuario.findOne({email});

    if(!usuario){
        await res.status(401).json({mensaje: 'Este email no existe'})
        next()
    }else{
        // Si el usuario existe, pues verificamos si el password existe o no existe
        if(!bcrypt.compareSync(password, usuario.password)){
            // Si el password es incorrecto
            await res.status(401).json({mensaje: 'password incorrecto'})
            next();
        }else{
            // Password correcto, firmaremos el token   
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            },
                'LLAVESECRETA',{
                    expiresIn: '24h'
                }
            );

            // Retornar el token
            res.json({token})
        }
    }
}