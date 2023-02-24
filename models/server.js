const express = require('express');
var cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
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
        
        this.app.use(this.usuariosPath, require('../routes/usuarios.routes'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port )
        });
    }

}

module.exports = Server;