const { Router } = require('express'); 
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');
const { existeCategoriaPorId } = require('../helpers/db-validators');


const router = Router();



//TODO: CREAR - con token - privado
router.post('/', [
    validarJWT ,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
   ], crearProducto );


//TODO: OBTENER - todas - publico
router.get('/', obtenerProductos);


//TODO: OBTENER - por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], obtenerProducto );


//TODO: ACTUALIZAR - tener token - privado
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarProducto);


//TODO: BORRAR - ser admin -  privado
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarProducto );


module.exports = router;