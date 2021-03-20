const {response,request}= require('express');

const {Producto}= require('../models');

const obtenerProductos = async (req=request,res=response) =>{

    const {limite=5, desde=0}= req.query;
    const query={estado:true};

    const [total,productos]= await Promise.all([
        
        Producto.find(query).countDocuments(),
        Producto.find(query).populate('usuario','nombre').populate('categoria','nombre').skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({
        msg: "Se retorna el listado de productos",
        total,
        productos
    })
}

const obtenerProducto= async (req=request,res=response) =>{
    const {id}=req.params;
    const producto= await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre');

    res.json({
        msg: "Se retorna la categoria",
        producto
    });
}

const crearProducto= async (req=request,res=response) =>{

    const {estado,...data} = req.body;

    const productoDB= await Producto.findOne({nombre:data.nombre});
    if(productoDB){
        res.status(400).json({
            msg: `El producto ${data.nombre} ya existe`
        })
    }

    //  Generar data a guardar
    data.usuario=req.usuario._id;

    const producto= new Producto(data);
    await producto.save();

    res.json({
        msj: "Producto creado de forma exitosa",
        producto: producto
    });
}

const actualizarProducto= async (req=request, res=response) =>{

    const {id}=req.params;
    const {estado,...data} = req.body;
    
    data.usuario=req.usuario._id;

    const producto= await Producto.findByIdAndUpdate(id,data,{new:true});

    res.json({
        msg: "El producto se ha actualizado de forma exitosa",
        producto
    });
}

const borrarProducto= async (req=request,res=response) =>{
    const {id}=req.params;
    const producto= await Producto.findByIdAndUpdate(id,{estado:false},{new:true});

    res.json({
        msg: `Se elimino el producto ${producto.nombre} de forma exitosa.`,
        producto
    });
}

module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}

