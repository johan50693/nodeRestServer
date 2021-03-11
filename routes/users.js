
const { Router }= require('express');
const { check } = require('express-validator');
const {usuariosGet, usuariosPost, usuariosPut,usuariosPatch, usuariosDelete} = require('../controllers/users');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router= Router();

router.get('/',usuariosGet);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener mas de 6 caracteres').isLength({min:6}),
    check('correo','El correo no es válido').isEmail(),
    // check('rol','El rol enviado no se considera válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom( emailExiste),
    check('rol').custom( esRoleValido),
    validarCampos
],usuariosPost);

router.put('/:id',usuariosPut);

router.patch('/',usuariosPatch);

router.delete('/',usuariosDelete);



module.exports= router;
