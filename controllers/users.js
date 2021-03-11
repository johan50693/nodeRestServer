const {response,request}= require('express');
const Usuario= require('../models/usuario');
const bcryptjs= require('bcryptjs');

const usuariosGet= (req=request, res=response) => {

    const {nombre,query,id}= req.query;

    res.json({
        msg: "get API - controller",
        query,
        id
    })
}

const usuariosPost= async (req, res) => {

    const {nombre,correo,password,rol}=req.body;
    const usuario= new Usuario({nombre,correo,password,rol});
    
    // verificar si el correo existe

    // encriptar contraseña
    const salt= bcryptjs.genSaltSync();
    usuario.password= bcryptjs.hashSync(password,salt);
    
    //  guardar contraseña
    await usuario.save();

    res.json({
        msg: "post API controller ",
        usuario
    })
}

const usuariosPut= (req, res) => {
    
    const id= req.params.id;

    res.json({
        msg: "put API - controller",
        id: id
    })
}
const usuariosPatch= (req, res) => {
    res.json({
        msg: "patch API - controller"
    })
}

const usuariosDelete= (req, res) => {
    res.json({
        msg: "delete API - controller"
    })
}




module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}