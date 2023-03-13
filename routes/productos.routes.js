const { Router } = require('express'); 
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        actualizarProducto, 
        borrarProducto } = require('../controllers/productos.controller');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');


const router = Router();



//TODO: CREAR - con token - privado
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es in ID de mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
   ], crearProducto );


//TODO: OBTENER - todas - publico
router.get('/', obtenerProductos);


//TODO: OBTENER - por id - publico
router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], obtenerProducto );


//TODO: ACTUALIZAR - tener token - privado
router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es in ID de mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto );


//TODO: BORRAR - ser admin -  privado
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto );


module.exports = router;