
const { Router }= require('express');
const { check } = require('express-validator');
const { cargarArchivos } = require('../controllers');

const { validarCampos } = require('../middlewares/validar-campos');

const router= Router();

router.post('/',cargarArchivos);

module.exports=router;