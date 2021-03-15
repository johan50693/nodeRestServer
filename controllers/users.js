const {response,request}= require('express');
const Usuario= require('../models/usuario');
const bcryptjs= require('bcryptjs');

const usuariosGet= async (req=request, res=response) => {

    const {limite=5, desde=0}= req.query;
    const query={estado:true};
    // const usuarios= await Usuario.find(query).skip(Number(desde)).limit(Number(limite));
    // const total= await Usuario.find(query).countDocuments();

    const [total,usuarios]= await Promise.all([
        Usuario.find(query).countDocuments(),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({
        msg: "Se retorna el listado de usuarios",
        total,
        usuarios
    })
}

const usuariosPost= async (req, res) => {

    const {nombre,correo,password,rol}=req.body;
    const usuario= new Usuario({nombre,correo,password,rol});
    
    // encriptar contraseña
    const salt= bcryptjs.genSaltSync();
    usuario.password= bcryptjs.hashSync(password,salt);
    
    //  guardar contraseña
    await usuario.save();

    res.json({
        msg: "El usuario se ha creado de forma exitosa.",
        usuario
    })
}

const usuariosPut= async (req, res) => {
    
    const {id}= req.params;
    const {_id,password, google,correo,...resto}= req.body;

    if(password){
        // encriptar contraseña
        const salt= bcryptjs.genSaltSync();
        resto.password= bcryptjs.hashSync(password,salt);
    }

    usuario= await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg: `El usuario ${usuario.nombre} se ha actualizado de manera exitosa.`,
        usuario: usuario
    })
}
const usuariosPatch= (req, res) => {
    res.json({
        msg: "patch API - controller"
    })
}

const usuariosDelete= async (req, res) => {

    const {id}= req.params;
    // const uid= req.usuario.uid;
    
    const usuario= await Usuario.findByIdAndUpdate(id,{estado:false});
    const usuarioAutenticado=req.usuario;

    res.json({
        msg: "Usuario eliminado de manera exitosa",
        usuario
    })
}




module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}