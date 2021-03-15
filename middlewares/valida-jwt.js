
const { response, request } = require('express');
const jwt= require('jsonwebtoken');
const Usuario= require('../models/usuario');

const validarJWT= async (req= request,res=response,next) =>{

    const token= req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        });
    }

    try {
        
        const {uid}= jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        // Consultar usuario logueado
        const usuario= await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: "Este usuario no se encuentra registrado"
            });
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: "Token no válido"
            });
        }
        req.usuario=usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
    
}

module.exports={
    validarJWT
}