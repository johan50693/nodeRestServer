

const validarJWT = require('../middlewares/valida-jwt');
const validarCampos = require('../middlewares/validar-campos');
const validarRoles= require('../middlewares/validar-roles');
const validarArchivo= require('../middlewares/validar-archivo');

module.exports={
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarArchivo
}