const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';


        //Conectar a base de datos
        this.conectarDB();
        
        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() { // middleware es todos los app.use()

        //CORS - generar listas blanca y negras que pueden realizar peticiones
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //EXPRESS - Directorio publico
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usuariosPath, require('../routes/usuarios.routes'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port )
        });
    }

}

module.exports = Server;