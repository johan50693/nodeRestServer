const {request,response}= require('express');
const path= require('path');

const cargarArchivos=(req=request,res=response) =>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msg:'No se envio archivos en la petición.'
        });
        return;
    }

    const {archivo} = req.files;

    const uploadPath = path.join (__dirname, '../uploads/', archivo.name);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({msg:err});
        }

        res.json({
            msg: 'El archiva se ha cargado en la ruta: ' + uploadPath
        });
    });

}

module.exports={
    cargarArchivos
}