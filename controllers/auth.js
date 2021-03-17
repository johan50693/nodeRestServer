
const {response,request}= require('express');
const bcryptjs=require('bcryptjs');

const Usuario= require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const {googleVerify}=require('../helpers/google-verify');

const login= async (req,res=response) =>{
    
    const {correo,password}= req.body;

    try {
        
        // Verificar si el email existe
        const usuario= await Usuario.findOne({correo,correo});

        if(!usuario){
            return res.json({
                msg: "Usuario no se encuentra registrado en el sistema"
            });
        }
        // usuario inactivo
        if(!usuario.estado){
            return res.json({
                msg: "El usuario no se encuentra registrado en el sistema"
            });
        }

        // verificar contraseña
        const validPassword= bcryptjs.compareSync(password,usuario.password);

        if(!validPassword){
            return res.json({
                msg: "Usuario o clave inválidos"
            });
        }

        // generar JWT
        const token= await generarJWT(usuario.id);

        res.json({
            msg: "Se ha logeado de manera exitosa",
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error procesando su solicitud, por favor intente de nuevo mas tarde.'
        });
    }
}


const googleSignin= async (req=request,res=response) =>{

    const {id_token}= req.body;
    try {
        
        const {correo,nombre,img}= await googleVerify(id_token);

        // Verificar si el email existe
        let usuario= await Usuario.findOne({correo});

        // usuario no existe
        if(!usuario){
            // Crear usuario
            const data={nombre,
                        correo,
                        password: 'google',
                        img,
                        google:true
                        };
            usuario= new Usuario(data);
            await usuario.save();
        }        

        // Usuario eliminado
        if(!usuario.estado){
            return res.status(401).json({
                msg: "El usuario se encuentra bloqueado"
            });
        }

        // generar JWT
        const token= await generarJWT(usuario.id);

        res.json({
            msg: "Login google exitoso",
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Token de google no reconocible"
        });
    }
}
module.exports={
    login,
    googleSignin
}