const Role= require('../models/role');
const Usuario= require('../models/usuario');

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

module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}