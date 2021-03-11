
const mongoose= require('mongoose');

const dbConennection= async () =>{

        try {
            await mongoose.connect( process.env.MONGODB_CNN, {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });

            console.log('Conexión exitosa a la BD Mongo');

        } catch (error) {
            console.log(error);
            throw new Error('Error de conexión a la Base de Datos');
        }
}


module.exports={
    dbConennection
}