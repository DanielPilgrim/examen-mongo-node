import express, { json } from 'express';
import dbConnection from '../database/config.js';
import accountRoutes from '../routes/accountRoute.js';

class Server {
    constructor() {
        this.app = express();
        this.middlewares();
        this.dbConnection();
        this.routes();
        this.listen();
    }

    middlewares() {
        this.app.use(json());
    }

    async dbConnection() {
        await dbConnection();
    }

    routes() {
        this.app.use('/api', accountRoutes);
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Server is running');
        });
    }
}

export default Server;
