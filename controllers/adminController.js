const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registrarAdmin = async(req,res) => {
    // leemos los datos entrados y colocamos dentro del modelo usuario
    const admin = new Admin(req.body);
    // hasheo del password
    admin.password = await bcrypt.hash(req.body.password, 12);

    try {
        await admin.save();
        res.json({mensaje: 'Administrador creado correctamente'})
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Hubo un error'})
    }
}

exports.autenticarAdmin = async(req,res,next) => {
    // Buscamos el usuario  
    const {email,password} =req.body
    const admin = await Admin.findOne({email});

    if(!admin){
        await res.status(401).json({mensaje: 'Este email no existe'})
        next()
    }else{
        // Si el usuario existe, pues verificamos si el password existe o no existe
        if(!bcrypt.compareSync(password, admin.password)){
            // Si el password es incorrecto
            await res.status(401).json({mensaje: 'password incorrecto'})
            next();
        }else{
            // Password correcto, firmaremos el token   
            const token = jwt.sign({
                email: admin.email,
                nombre: admin.nombre,
                id: admin._id
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