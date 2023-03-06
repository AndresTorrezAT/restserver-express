const { Router } = require('express'); // para configurar rutas
const { check } = require('express-validator');

const { login, gooogleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),  
    check('password', 'La contraseña es obligatoria').not().isEmpty(),  
    validarCampos
], login );


router.post('/google',[
    check('id_token', 'id_token es necesario').not().isEmpty(),  
    validarCampos
], gooogleSignIn );

module.exports = router;