
const { Router, response, request }= require('express');
const { check } = require('express-validator');

const {validarCampos,validarJWT, esAdminRole}= require('../middlewares');
const {crearCategoria, ObtenerCategorias, actualizarCategoria, ObtenerCategoria, borrarCategoria}= require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');

const router= Router();

router.get('/',ObtenerCategorias);

router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
    ],ObtenerCategoria);


router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ],crearCategoria);

// actualizar una categoría privado, necesita token
router.put('/:id',[
    validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCategoria);

// eliminar una categoría privado, necesita token y ser ADMON
router.delete('/:id',[
    validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    esAdminRole,
    validarCampos
],borrarCategoria);

module.exports= router;