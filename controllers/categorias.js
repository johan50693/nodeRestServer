const {response,request}= require('express');

const {Categoria}= require('../models');

// obtenerCategorias - paginado - populate
const ObtenerCategorias = async (req=request,res=response) =>{

    const {limite=5, desde=0}= req.query;
    const query={estado:true};

    const [total,categorias]= await Promise.all([
        
        Categoria.find(query).countDocuments(),
        Categoria.find(query).populate('usuario','nombre').skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({
        msg: "Se retorna el listado de categorias",
        total,
        categorias
    })
}
//  ObtenerCategoria - populate
const ObtenerCategoria= async (req=request,res=response) =>{
    const {id}=req.params;
    const categoriaDB= await Categoria.findById(id).populate('usuario','nombre');

    res.json({
        msg: "Se retorna la categoria",
        categoria: categoriaDB
    });
}

const crearCategoria= async (req=request,res=response) =>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB= await Categoria.findOne({nombre});
    if(categoriaDB){
        res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    //  Generar data a guardar
    const data= {
        nombre,
        usuario: req.usuario._id
    };

    const categoria= new Categoria(data);
    await categoria.save();

    res.json({
        msj: "Categoría creada de forma exitosa",
        categoria
    });
}

// actualizarCategoria
const actualizarCategoria= async (req=request, res=response) =>{

    const {id}=req.params;
    const {usuario,estado,...data} = req.body;
    
    data.nombre= data.nombre.toUpperCase();
    data.usuario=req.usuario._id;

    const categoria= await Categoria.findByIdAndUpdate(id,data,{new:true});

    res.json({
        msg: "Categoria actualizada",
        categoria
    });
}

const borrarCategoria= async (req=request,res=response) =>{
    const {id}=req.params;
    const categoriaDB= await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});

    res.json({
        msg: `Se elimino la categoria ${categoriaDB.nombre} de forma exitosa.`,
        categoria:categoriaDB
    });
}

module.exports={
    crearCategoria,
    ObtenerCategorias,
    ObtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}

