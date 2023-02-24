
const { Router } = require('express'); // para configurar rutas

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios.controller');


const router = Router();

router.get('/', usuariosGet); // usuariosGet y demas... Son referencias de la funcion, no son ejecuciones

router.post('/', usuariosPost);

router.put('/:id', usuariosPut); // expres parsea y configura el :id y icluso te lo da de variable

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);



module.exports = router;