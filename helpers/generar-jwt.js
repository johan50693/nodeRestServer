const jwt= require('jsonwebtoken');

const generarJWT= (uid='') =>{

    return new Promise((resolve,reject) =>{

        const payload= {uid};

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn: '1h'
        }, (err,token) =>{

            if(err){
                console.log(err);
                reject('Ha ocurrido un error generando su token');
            }else{
                resolve(token);
            }
        })
    });

}


module.exports={
    generarJWT
};