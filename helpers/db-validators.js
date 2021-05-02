const { Categoria, Producto, Usuario } = require('../models');
const Role= require('../models/role');

const esRoleValido= async (rol='') =>{
    const existeRol= await Role.findOne({rol:rol});
    if(!existeRol){
        throw new Error("El rol suministrado no esta registrado en la base de datos");
    }
}

const emailExiste= async (correo='') => {
    const existeEmail= await Usuario.findOne({correo});

    if(existeEmail){
        throw new Error ('El correo ya se encuentra registrado');
    }
}

const existeUsuarioPorId= async (id='') => {
    const existeUsuario= await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error ('El id no se encuentra registrado');
    }
}

const existeCategoria= async (id='') => {
    const categoria= await Categoria.findById(id);
    
    if(!categoria){
        throw new Error ('La categoría no se encuentra registrada');
    }
}

const existeProducto= async (id='') => {
    const producto= await Producto.findById(id);
    
    if(!producto){
        throw new Error ('El producto no se encuentra registrado');
    }
}

const coleccionesPermitidas= (coleccion='', colecciones=[]) =>{

    const incluida= colecciones.includes(coleccion);

    if(!incluida){
        throw new Error (`La coleccion ${coleccion} no es permitida`);
    }

    return true;
}

module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}