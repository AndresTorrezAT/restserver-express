const { Router } = require('express'); // para configurar rutas
const { check } = require('express-validator');


const { validarArchivoSubir, validarCampos } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers');


const router = Router();

router.post( '/',validarArchivoSubir ,cargarArchivo );

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagen );


router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos
], mostrarImagen );

module.exports = router;