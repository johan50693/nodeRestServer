const {response,request}= require('express');

const usuariosGet= (req=request, res=response) => {

    const {nombre,query,id}= req.query;

    res.json({
        msg: "get API - controller",
        query,
        id
    })
}

const usuariosPost= (req, res) => {
    
    const {nombre,edad}=req.body;

    res.json({
        msg: "post API controller ",
        nombre,
        edad
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