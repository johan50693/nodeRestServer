const path= require('path');
const fs= require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const {request,response}= require('express');
const {subirArchivo}=require('../helpers');
const {Usuario,Producto}= require('../models')

const cargarArchivos= async (req=request,res=response) =>{

    try {
        const nombre =await subirArchivo(req.files,undefined,'imgs');
        res.json({nombre});
    } catch (msg) {
        res.status(400).json({msg})
    }

}

const actualizarImagen= async (req=request,res=response) =>{

    const {coleccion,id}= req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo= await Usuario.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
        break;

        case 'productos':
            modelo= await Producto.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
        break;
    
        default:
            return res.json({msg: 'El modelo enviado no se encuentra permitido'})
    }

    try {

        if(modelo.img){

            // borrar imagen del servidor
            const pathTmagen= path.join(__dirname,'../uploads/',coleccion,modelo.img);
            if(fs.existsSync(pathTmagen)){
                fs.unlinkSync(pathTmagen);
            }

        }

        const nombre =await subirArchivo(req.files,undefined,coleccion);
        modelo.img=nombre;
        modelo.save();
    } catch (msg) {
        res.status(400).json({msg})
    }

    res.json({
        modelo
    });

}

const actualizarImagenCloudinary= async (req=request,res=response) =>{

    const {coleccion,id}= req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo= await Usuario.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
        break;

        case 'productos':
            modelo= await Producto.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
        break;
    
        default:
            return res.json({msg: 'El modelo enviado no se encuentra permitido'})
    }

    try {

        if(modelo.img){
            const nombreArr= modelo.img.split('/');
            const nombre= nombreArr[nombreArr.length-1];
            const [public_id] = nombre.split('.');
            await cloudinary.uploader.destroy(public_id);
            
        }

        const {tempFilePath}= req.files.archivo;

        const {secure_url}= await cloudinary.uploader.upload(tempFilePath);
       
        modelo.img=secure_url;
        modelo.save();

        res.json({modelo});
    } catch (msg) {
        res.status(400).json({msg})
    }


}
const mostrarImagen= async (req,res=response) =>{

    const {coleccion,id}= req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo= await Usuario.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
        break;

        case 'productos':
            modelo= await Producto.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
        break;
    
        default:
            return res.json({msg: 'El modelo enviado no se encuentra permitido'})
    }

    try {

        if(modelo.img){

            // borrar imagen del servidor
            const pathTmagen= path.join(__dirname,'../uploads/',coleccion,modelo.img);
            if(fs.existsSync(pathTmagen)){
                return res.sendFile(pathTmagen);
            }

        }

        const pathTmagen= path.join(__dirname,'../assets/no-image.jpg');
        return res.sendFile(pathTmagen);

    } catch (msg) {
        res.status(400).json({msg});
    }


}

module.exports={
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}