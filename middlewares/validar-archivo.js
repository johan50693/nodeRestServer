
const { validationResult } = require('express-validator');

const validarArchivoSubir= (req,res, next) =>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg:'No se envio archivos en la petición - middleware'});
    }

    next();
}

module.exports={
    validarArchivoSubir
}