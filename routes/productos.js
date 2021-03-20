
const { Router, response, request }= require('express');
const { check } = require('express-validator');

const {validarCampos,validarJWT, esAdminRole}= require('../middlewares');
const {crearProducto,obtenerProductos,obtenerProducto, actualizarProducto, borrarProducto}= require('../controllers');

const { existeCategoria, existeProducto } = require('../helpers/db-validators');


const router= Router();

router.get('/',obtenerProductos);

router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
    ],obtenerProducto);


router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('categoria','No es un  ID válido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
    ],crearProducto);

router.put('/:id',[
    validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],actualizarProducto);

// eliminar una categoría privado, necesita token y ser ADMON
router.delete('/:id',[
    validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    esAdminRole,
    validarCampos
],borrarProducto);

module.exports= router;