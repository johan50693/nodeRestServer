
const express = require('express');
var cors = require('cors');
const { dbConennection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.usuariosPath='/api/usuarios';
        this.authPath='/api/auth';

        //  Conectar a BD
        this.conectarDB();
        
        // Middleware
        this.middlewares();

        //  Rutas aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConennection();
    }

    middlewares(){
        
        // CORS
        this.app.use(cors())

        // lectura y parseo del body
        this.app.use(express.json());

        //  Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.usuariosPath,require('../routes/users'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corrriendo en el puerto', this.port);
        });
    }

}


module.exports=Server;