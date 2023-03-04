const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
        
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );// se va al catch cuando algo falla o no es valido el token

        //leer el usuario que corresponda al uid
        const usuario = await Usuario.findById( uid );

        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en la DB'
            });
        }

        //Verificar si el uid tiene estado true
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            });
        }
        

        req.usuario  = usuario;
        next();
        
    } catch (error) {
    
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
        
    }
    
}


module.exports = {
    validarJWT
}