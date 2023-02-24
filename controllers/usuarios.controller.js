const { request, response } = require('express');

const usuariosGet = ( req = request, res = response ) => { // res = responde solo es para autocompletar el tipado

    const { q, nombre = 'No name'} = req.query;

    res.json({

        msg: 'get API - controlador',
        q,
        nombre

    });
}

const usuariosPost = (req, res = response ) => {

    const { nombre, edad } = req.body; // el body de la request

    res.json({
  
        msg: 'post API - controlador',
        nombre,
        edad

    });
}

const usuariosPut = (req, res = response ) => {

    const { id } = req.params;

    res.json({

        msg: 'put API - controlador',
        id

    });
}

const usuariosPatch = (req, res = response ) => {
    res.json({
  
        msg: 'patch API - controlador'

    });
}

const usuariosDelete = (req, res = response ) => {
    res.json({

        msg: 'delete API - controlador'

    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}

