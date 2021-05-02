
const { Router }= require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagen } = require('../controllers');
const { coleccionesPermitidas } = require('../helpers');

const { validarCampos, validarArchivoSubir } = require('../middlewares');

const router= Router();

router.post('/',validarArchivoSubir,cargarArchivos);
router.put('/:coleccion/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarArchivoSubir,
    validarCampos
],actualizarImagen);

module.exports=router;